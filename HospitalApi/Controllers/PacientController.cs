using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class PacientController : ControllerBase
    {

        private readonly ILogger<PacientController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public PacientController(ILogger<PacientController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<PacientDTO>>> GetPacients()
        {

            _logger.LogInformation("Obtenint els pacients");

            var pacientList = await _bbdd.Pacients.Include("EpisodisMedics").ToListAsync();

            if (pacientList == null)
            {

                return NoContent();

            }
            else
            {

                return Ok(_mapper.Map<IEnumerable<PacientDTO>>(pacientList));

            }

        }


        [HttpGet("id", Name = "GetPacient")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetPacient(string id)
        {

            if (id.Length <= 0)
            {
                _logger.LogError("Error: dades introduïdes en format incorrecte.");
                return BadRequest("Error: dades introduïdes en format incorrecte.");
            }

            var pacient = await _bbdd.Pacients.FirstOrDefaultAsync(h => h.DNI == id);

            if (pacient == null)
            {
                _logger.LogError("Error, no existeix el pacient amb el id indicat.");
                return NotFound("Error, no existeix el pacient amb el id indicat.");
            }

            return Ok(_mapper.Map<PacientDTO>(pacient));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PacientCreateDTO>> PostPacient([FromBody] PacientCreateDTO userPacientDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Este que comprobar directament desde el ModelState
            if (userPacientDTO.DNI.Length < 9) return BadRequest(ModelState);

            if (userPacientDTO == null)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest("Error: dades introduïdes incorrectes.");
            }

            var pacient = _mapper.Map<Pacient>(userPacientDTO);

            await _bbdd.Pacients.AddAsync(pacient);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient afegit exitosament.");
            return CreatedAtRoute("GetPacient", _mapper.Map<PacientCreateDTO>(pacient));

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePacient(string id)
        {

            var pacient = await _bbdd.Pacients.FirstOrDefaultAsync(h => h.DNI == id);

            if (pacient == null)
            {
                _logger.LogError("Error: no existeix pacient amb l'ID indicat.");
                return NotFound("Error: no existeix pacient amb l'ID indicat.");
            }

            _bbdd.Pacients.Remove(pacient);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient eliminat exitosament.");
            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePacient(string id, [FromBody] PacientCreateDTO userPacientDTO)
        {

            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
                return BadRequest("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
            }

            if (id != userPacientDTO.DNI)
            {
                _logger.LogError("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
                return BadRequest("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
            }

            //** Es te que comprobar amb el model **//
            // if (userPacientDTO == null || id != userPacientDTO.DNI)
            // {
            //     _logger.LogError("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
            //     return BadRequest("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
            // }

            Pacient pacient = _mapper.Map<Pacient>(userPacientDTO);

            _bbdd.Pacients.Update(pacient);
            await _bbdd.SaveChangesAsync();

            // Implementar try catch per controlar posibles excepcions inesperades del metodo async
            if (pacient == null)
            {
                return BadRequest();
            }
            else
            {
                _logger.LogInformation("Pacient modificat exitosament.");
                return NoContent();
            }
        }

        [HttpPatch("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdateParcialPacient(string id, [FromBody] JsonPatchDocument<PacientCreateDTO> patchDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: no existeix el pacient amb el ID indicat.");
                return BadRequest("Error: no existeix el pacient amb el ID indicat.");
            }

            //** La comprovasio te que ser per Model **//
            // if (patchDto == null || id.Length < 9)
            // {
            //     _logger.LogError("Error: no existeix el pacient amb el ID indicat.");
            //     return BadRequest("Error: no existeix el pacient amb el ID indicat.");
            // }

            var pacient = await _bbdd.Pacients.AsNoTracking().FirstOrDefaultAsync(v => v.DNI == id);

            if (pacient == null)
            {
                _logger.LogError("Error: no existeix el pacient amb el ID indicat.");
                return BadRequest("Error: no existeix el pacient amb el ID indicat.");
            }

            PacientCreateDTO pacientdto = _mapper.Map<PacientCreateDTO>(pacient);

            patchDto.ApplyTo(pacientdto, ModelState);

            // Perque una validacio de model?
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Falta implementar try cathc per posibles excepcion inprevistes
            Pacient modelo = _mapper.Map<Pacient>(pacientdto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient actualitzat.");
            return NoContent();

        }

    }
}
