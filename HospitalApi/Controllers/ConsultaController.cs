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
    public class ConsultaController : ControllerBase
    {
        private readonly ILogger<ConsultaController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public ConsultaController(
            ILogger<ConsultaController> logger,
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
        public async Task<ActionResult<IEnumerable<ConsultaDTO>>> GetConsultes()
        {
            _logger.LogInformation("Obteint les consultes");

            IEnumerable<Consulta> conList = await _bbdd
                .Consultes.Include("Personal")
                .Include("Pacient")
                .Include("EpisodiMedic")
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ConsultaDTO>>(conList));
        }

        [HttpGet("id", Name = "GetCon")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ConsultaDTO>> GetConsulta(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Format de ID incorrecte.");
                return BadRequest();
            }

            var con = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (con == null)
            {
                _logger.LogError("No existe una consulta con el ID: " + id);
                return NotFound(con);
            }
            return Ok(_mapper.Map<ConsultaDTO>(con));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ConsultaCreateDTO>> PostConsulta(
            [FromBody] ConsultaCreateDTO userConDTO
        )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pacient = await _bbdd.Consultes.FindAsync(userConDTO.PacientId);

            if (pacient == null)
                return BadRequest("No existe ningún paciente con el id proporcionado.");

            var personal = await _bbdd.Consultes.FindAsync(userConDTO.PersonalId);

            if (personal == null)
                return BadRequest("No esxiste ningún médico con el id proporcionado.");

            var episodi = await _bbdd.Consultes.FindAsync(userConDTO.EpisodiMedicId);

            if (episodi == null)
                return BadRequest("No existe ningún episodio médico con el id proporcionado.");

            Consulta consulta = _mapper.Map<Consulta>(userConDTO);
            consulta.PacientId = pacient.Id;
            consulta.PersonalId = personal.Id;
            consulta.EpisodiMedicId = episodi.Id;

            await _bbdd.Consultes.AddAsync(consulta);
            await _bbdd.SaveChangesAsync();

            return CreatedAtRoute("GetCon", _mapper.Map<ConsultaCreateDTO>(consulta));
        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Format de id incorrecto");
                return BadRequest();
            }

            var consulta = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (consulta == null)
            {
                _logger.LogError("Id de consulta no encontrado");
                return NotFound();
            }

            _bbdd.Consultes.Remove(consulta);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Consulta borrada exitosamente");
            return NoContent();
        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCon(int id, [FromBody] ConsultaDTO userConDTO)
        {
            if (userConDTO.Id == null || id != userConDTO.Id)
                return BadRequest();
            Consulta consulta = _mapper.Map<Consulta>(userConDTO);

            _bbdd.Consultes.Update(consulta);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }
    }
}
