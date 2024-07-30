using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
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
            _logger.LogInformation("Obtenint les consultes");

            IEnumerable<Consulta> conList = await _bbdd
                .Consultes
                .Include("Personal")
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
                _logger.LogError("Format d'ID incorrecte.");
                return BadRequest("Format d'ID incorrecte.");
            }

            var con = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (con == null)
            {
                _logger.LogError("No existeix una consulta amb l'ID indicat.");
                return NotFound("No existeix una consulta amb l'ID indicat.");
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
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var personal = await _bbdd.Personals.FindAsync(userConDTO.PersonalId);

            var episodi = await _bbdd.EpisodisMedics.FindAsync(userConDTO.EpisodiMedicId);

            if (personal == null)
                return BadRequest("No existeix cap metge amb l'ID indicat.");

            if (episodi == null)
                return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");

            Consulta consulta = _mapper.Map<Consulta>(userConDTO);
            consulta.PersonalId = personal.DNI;
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
                return BadRequest("Format de id incorrecto");
            }

            var consulta = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (consulta == null)
            {
                _logger.LogError("Id de consulta no trobat.");
                return NotFound("Id de consulta no trobat.");
            }

            _bbdd.Consultes.Remove(consulta);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Consulta borrada exitosament.");
            return NoContent();
        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCon(int id, [FromBody] ConsultaDTO userConDTO)
        {
            if (userConDTO == null || id != userConDTO.Id)
                return BadRequest("No existeix la ID indicada.");

            var existeixCon = await _bbdd.Consultes.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

            if (existeixCon == null)
            {
                _logger.LogError("No existeix consutla amb aquest ID.");
                return NotFound("No existeix consulta amb aquest ID.");
            }

            Consulta consulta = _mapper.Map<Consulta>(userConDTO);

            var personal = await _bbdd.Personals.FindAsync(userConDTO.PersonalId);

            var episodi = await _bbdd.EpisodisMedics.FindAsync(userConDTO.EpisodiMedicId);

            if (personal == null)
                return BadRequest("No existeix cap metge amb l'ID indicat.");

            if (episodi == null)
                return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");


            _bbdd.Consultes.Update(consulta);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdateParcialConsulta(int id,JsonPatchDocument<ConsultaDTO> patchDto)
        {
            if (patchDto == null || id <= 0)
            {
                _logger.LogError("Error: no existeix la consulta amb el ID indicat.");
                return BadRequest("Error: no existeix la consulta amb el ID indicat.");
            }

            var consulta = await _bbdd.Consultes.AsNoTracking().FirstOrDefaultAsync(v => v.Id == id);

            ConsultaDTO consultadto = _mapper.Map<ConsultaDTO>(consulta);

            patchDto.ApplyTo(consultadto, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var personal = await _bbdd.Personals.FindAsync(consultadto.PersonalId);

            var episodi = await _bbdd.EpisodisMedics.FindAsync(consultadto.EpisodiMedicId);

            if (personal == null)
                return BadRequest("No existeix cap metge amb l'ID indicat.");

            if (episodi == null)
                return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");

            Consulta modelo = _mapper.Map<Consulta>(consultadto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Consulta actualitzada.");
            return NoContent();
        }
    }
}
