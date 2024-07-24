using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
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
            IEnumerable<Llit> llitList = await _bbdd.Llits.Include("Habitacio").Include("Ingressos").ToListAsync();
            return Ok(_mapper.Map<IEnumerable<LlitDTO>>(llitList));

        }


        [HttpGet("id", Name = "GetLlit")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetLlit(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: dades introdu�des amb format incorrecte.");
                return BadRequest("Error: dades introdu�des amb format incorrecte.");
            }

            var llit = await _bbdd.Llits.FirstOrDefaultAsync(h => h.Id == id);

            if (llit == null)
            {
                _logger.LogError("Error: no existeix el llit amb el id indicat.");
                return NotFound("Error: no existeix el llit amb el id indicat.");
            }

            return Ok(_mapper.Map<LlitDTO>(llit));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<HabitacioCreateDTO>> PostLlit([FromBody] LlitCreateDTO userLlitDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (userLlitDTO == null)
            {
                _logger.LogError("Error: dades introdu�des incorrectes.");
                return BadRequest(userLlitDTO);
            }

            var habitacio = await _bbdd.Habitacions.FindAsync(userLlitDTO.HabitacioId);

            if (habitacio == null)
            {
                _logger.LogError("Error: no existeix la habitaci� amb l'ID indicat.");
                return BadRequest("Error: no existeix la habitaci� amb l'ID indicat");
            }

            if (habitacio.Llits.Count >= habitacio.Num_llits) {
                return BadRequest("No se pueden agregar más camas a esta habitación.");
            }


            Llit llit = _mapper.Map<Llit>(userLlitDTO);
            llit.HabitacioId = habitacio.Id;

            await _bbdd.Llits.AddAsync(llit);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit creat exitosament.");
            return CreatedAtRoute("GetLlit", _mapper.Map<LlitCreateDTO>(llit));

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteLlit(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
                return BadRequest(ModelState);
            }

            var llit = await _bbdd.Llits.FirstOrDefaultAsync(h => h.Id == id);

            if (llit == null)
            {
                _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
                return NotFound("Error: no existeix el llit amb l'ID indicat.");
            }

            _bbdd.Llits.Remove(llit);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit esborrat exitosament.");
            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateLlit(int id, [FromBody] LlitDTO userLlitDTO)
        {

            if (userLlitDTO == null || id != userLlitDTO.Id)
            {
                _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
                return NotFound("Error: no existeix el llit amb l'ID indicat.");
            }

            Llit llit = _mapper.Map<Llit>(userLlitDTO);

            _bbdd.Llits.Update(llit);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Llit modificat exitosament.");
            return NoContent();
        }


    }
}
