using System.Runtime.CompilerServices;
using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class LlitController : ControllerBase
    {

        private readonly ILogger<LlitController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public LlitController(ILogger<LlitController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<LlitDTO>>> GetLlits()
        {

            _logger.LogInformation("Obtenint els llits.");

            // Crec que es millor implementa var en vers de IEnumerable<Llit> si no implementem try catch per posibles excepcions
            // var llitList = await _bbdd.Llits
            IEnumerable<Llit> llitList = await _bbdd.Llits
                .Include("Habitacio").Include("Ingressos").ToListAsync();

            return Ok(_mapper.Map<IEnumerable<LlitDTO>>(llitList));

        }


        [HttpGet("id", Name = "GetLlit")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetLlit(string id)
        {

            if (string.IsNullOrWhiteSpace(id))
            {
                _logger.LogError("Error: id no pot ser nul o buit.");
                return BadRequest("Error: id no pot ser nul o buit.");
            }

            // Verifica si el id te el format correcte (en aquest cas en un GUID)
            if (!Guid.TryParse(id, out var parsedId))
            {
                _logger.LogError("Error: id amb format incorrecte.");
                return BadRequest("Error: id amb format incorrecte.");
            }


            //** La comprovasio te que ser per Model **//
            // if (id.Length < 4)
            // {
            //     _logger.LogError("Error: dades introduides amb format incorrecte.");
            //     return BadRequest("Error: dades introduides amb format incorrecte.");
            // }

            var llit = await _bbdd.Llits.FirstOrDefaultAsync(h => h.CodiLlit == id);

            if (llit == null)
            {
                _logger.LogError("Error: no existeix el llit amb el id indicat.");
                return NotFound("Error: no existeix el llit amb el id indicat.");
            }

            // Falta try catch per posibles excepcion no controlades
            return Ok(_mapper.Map<LlitDTO>(llit));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<HabitacioCreateDTO>> PostLlit([FromBody] LlitCreateDTO userLlitDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //** Este que comprobar per Model **//
            // if (userLlitDTO.CodiLlit.Length < 4)
            // {
            //     _logger.LogError("Error: dades introduides amb format incorrecte.");
            //     return BadRequest("Error: dades introduides amb format incorrecte.");
            // }

            //** O comprba el ModelState de forma automatica, es inesesari **//
            // if (userLlitDTO == null)
            // {
            //     _logger.LogError("Error: dades introduides incorrectes.");
            //     return BadRequest(userLlitDTO);
            // }

            var habitacio = await _bbdd.Habitacions.Include(h => h.Llits).
                FirstOrDefaultAsync(h => h.CodiHabitacio == userLlitDTO.HabitacioId);

            if (habitacio == null)
            {
                _logger.LogError("Error: no existeix la habitacio amb l'ID indicat.");
                return BadRequest("Error: no existeix la habitacio amb l'ID indicat");
            }

            // Falta comentar aquest fragment de codi
            if (habitacio.Llits == null)
            {
                habitacio.Llits = new List<Llit>();
            }

            if (habitacio.Llits.Count >= habitacio.CapacitatLlits)
            {
                _logger.LogError("No se pueden agregar más camas a esta habitación.");
                return BadRequest("No se pueden agregar más camas a esta habitación.");
            }

            // Falta try catch per controlar posibles excepcions
            Llit llit = _mapper.Map<Llit>(userLlitDTO);
            llit.HabitacioId = habitacio.CodiHabitacio;

            await _bbdd.Llits.AddAsync(llit);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit creat exitosament.");
            return CreatedAtRoute("GetLlit", _mapper.Map<LlitCreateDTO>(llit));

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteLlit(string id)
        {

            var llit = await _bbdd.Llits.FirstOrDefaultAsync(h => h.CodiLlit == id);

            if (llit == null)
            {
                _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
                return NotFound("Error: no existeix el llit amb l'ID indicat.");
            }

            // Falta try catch per controlar posibles excepcions
            _bbdd.Llits.Remove(llit);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit esborrat exitosament.");
            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateLlit(int id, [FromBody] LlitCreateDTO userLlitDTO)
        {

            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
                return NotFound("Error: no existeix el llit amb l'ID indicat.");

            }

            //** La comprobasio te que ser per model **//
            // if (userLlitDTO == null || id != userLlitDTO.HabitacioId)
            // {
            //     _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
            //     return NotFound("Error: no existeix el llit amb l'ID indicat.");
            // }


            // Falta un try cahtc
            Llit llit = _mapper.Map<Llit>(userLlitDTO);

            _bbdd.Llits.Update(llit);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit modificat exitosament.");
            return NoContent();
        }

        [HttpPatch("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdateParcialLlit(string id, JsonPatchDocument<LlitDTO> patchDto)
        {

            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: dades introduides amb format incorrecte.");
                return BadRequest("Error: dades introduides amb format incorrecte.");
            }

            // Verifica si el id és nulo o és troba vuit
            if (string.IsNullOrWhiteSpace(id))
            {
                _logger.LogError("Error: id no pot ser nul o buit.");
                return BadRequest("Error: id no pot ser nul o buit.");
            }

            // Verifica si el id te el format correcte (en aques cas en un GUID)
            if (!Guid.TryParse(id, out var parsedId))
            {
                _logger.LogError("Error: id amb format incorrecte.");
                return BadRequest("Error: id amb format incorrecte.");
            }

            //** La comprobacio te que ser per model **//
            // if (id.Length < 4 || patchDto == null)
            // {
            //     _logger.LogError("Error: dades introduides amb format incorrecte.");
            //     return BadRequest("Error: dades introduides amb format incorrecte.");
            // }

            var llit = await _bbdd.Llits.AsNoTracking().FirstOrDefaultAsync(v => v.CodiLlit == id);

            LlitDTO llitdto = _mapper.Map<LlitDTO>(llit);

            patchDto.ApplyTo(llitdto, ModelState);

            // Comprovasio del model?
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Falta un try catch 
            Llit modelo = _mapper.Map<Llit>(llitdto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit actualitzat.");
            return NoContent();

        }

    }
}
