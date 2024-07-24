using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace HospitalAPI.Controllers
{
    [Route(("api/[Controller]"))]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly ILogger<PersonalController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public PersonalController(
            ILogger<PersonalController> logger,
            ApplicationDbContext bbdd,
            IMapper mapper
        )
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PersonalDTO>>> GetPersonals()
        {
            _logger.LogInformation("Obteint les consultes");

            IEnumerable<Personal> perList = await _bbdd
                .Consultes.Include("Personal")
                .Include("Pacient")
                .Include("EpisodiMedic")
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<PersonalDTO>>(perList));
        }

        [HttpGet("id", Name = "GetPer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PersonalDTO>> GetPersonal(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Format de ID incorrecte.");
                return BadRequest();
            }

            var con = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (con == null)
            {
                _logger.LogError("No existe Personal con el ID: " + id);
                return NotFound(con);
            }
            return Ok(_mapper.Map<PersonalDTO>(con));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PersonalCreateDTO>> PostPersonal(
            [FromBody] PersonalCreateDTO userPerDTO
        )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pacient = await _bbdd.Consultes.FindAsync(userPerDTO.PacientId);

            if (pacient == null)
                return BadRequest("No existe ningún paciente con el id proporcionado.");

            var personal = await _bbdd.Consultes.FindAsync(userPerDTO.PersonalId);

            if (personal == null)
                return BadRequest("No esxiste ningún médico con el id proporcionado.");

            var episodi = await _bbdd.Consultes.FindAsync(userPerDTO.EpisodiMedicId);

            if (episodi == null)
                return BadRequest("No existe ningún episodio médico con el id proporcionado.");

            Personal personal = _mapper.Map<Personal>(userPerDTO);
            personal.PacientId = pacient.Id;
            personal.PersonalId = personal.Id;
            personal.EpisodiMedicId = episodi.Id;

            await _bbdd.Consultes.AddAsync(personal);
            await _bbdd.SaveChangesAsync();

            return CreatedAtRoute("GetPer", _mapper.Map<PersonalCreateDTO>(personal));
        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePersonal(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Format de id incorrecto");
                return BadRequest();
            }

            var personal = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (personal == null)
            {
                _logger.LogError("Id de personal no encontrado");
                return NotFound();
            }

            _bbdd.Consultes.Remove(personal);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Personal borrado exitosamente");
            return NoContent();
        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePer(int id, [FromBody] PersonalDTO userPerDTO)
        {
            if (userPerDTO.Id == null || id != userPerDTO.Id)
                return BadRequest();
            Personal personal = _mapper.Map<Personal>(userPerDTO);

            _bbdd.Cosultes.Update(personal);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }
    }
}
