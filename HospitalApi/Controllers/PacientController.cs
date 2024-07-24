using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
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
        public async Task<ActionResult<IEnumerable<PacientDTO>>> GetPacients()
        {

            _logger.LogInformation("Obtenint els pacients");

            IEnumerable<Pacient> pacientList = await _bbdd.Pacients.Include("EpisodisMedics").Include("Consultes").ToListAsync();

            return Ok(_mapper.Map<IEnumerable<PacientDTO>>(pacientList));

        }


        [HttpGet("id", Name = "GetPacient")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetHabitacio(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: dades introduïdes en format incorrecte.");
                return BadRequest("Error: dades introduïdes en format incorrecte.");
            }

            var pacient = await _bbdd.Pacients.FirstOrDefaultAsync(h => h.Id == id);

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
        public async Task<ActionResult<PacientCreateDTO>> PostHabitacio([FromBody] PacientCreateDTO userPacientDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (userPacientDTO == null)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest("Error: dades introduïdes incorrectes.");
            }

            Pacient pacient = _mapper.Map<Pacient>(userPacientDTO);
            
            await _bbdd.Pacients.AddAsync(pacient);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient afegit exitosament.");
            return CreatedAtRoute("GetPacient", _mapper.Map<PacientCreateDTO>(pacient));

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePacient(int id)
        {
            if (id == 0) return BadRequest(ModelState);

            var pacient = await _bbdd.Pacients.FirstOrDefaultAsync(h => h.Id == id);

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
        public async Task<IActionResult> UpdatePacient(int id, [FromBody] PacientDTO userPacientDTO)
        {

            if (userPacientDTO == null || id != userPacientDTO.Id)
            {
                _logger.LogError("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
                return BadRequest("Error: no existeix pacient amb l'ID indicat o les dades introduïdes són incorrectes.");
            }

            Pacient pacient = _mapper.Map<Pacient>(userPacientDTO);

            _bbdd.Pacients.Update(pacient);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient modificat exitosament.");
            return NoContent();

        }

        [HttpPatch("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdateParcialPacient(int id, JsonPatchDocument <PacientDTO> patchDto)
        {
            if (patchDto == null || id <= 0)
            {
                _logger.LogError("Error: no existeix el pacient amb el ID indicat.");
                return BadRequest("Error: no existeix el pacient amb el ID indicat.");
            }

            var pacient = await _bbdd.Pacients.FirstOrDefaultAsync(v => v.Id == id);

            PacientDTO pacientdto = _mapper.Map<PacientDTO>(pacient);

            patchDto.ApplyTo(pacientdto, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Pacient modelo = _mapper.Map<Pacient>(pacientdto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient actualitzat.");
            return NoContent();

        }
    }
}
