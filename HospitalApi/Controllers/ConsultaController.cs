using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<ConsultaReadDTO>>> GetConsultes()
        {
            _logger.LogInformation("Obtenint les consultes");

            IEnumerable<Consulta> conList = await _bbdd
                .Consultes
                .Include("Personal")
                .Include("EpisodiMedic")
                .ToListAsync();

            IEnumerable<ConsultaReadDTO> consultes = _mapper.Map<IEnumerable<ConsultaReadDTO>>(conList);

            for (int i = 0; i < consultes.Count(); i++)
            {
                var dni = await (from p in _bbdd.Personals where p.Id == conList.ElementAt(i).PersonalId select p.DNI).FirstOrDefaultAsync();
                if (dni == null) { continue; }
                consultes.ElementAt(i).DNIPersonal = dni;
            }

            return Ok(consultes);

        }

        [HttpGet("{id:int}", Name = "GetCon")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ConsultaReadDTO>> GetConsulta(int id)
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

            ConsultaReadDTO consulta = _mapper.Map<ConsultaReadDTO>(con);
            var dni = await (from p in _bbdd.Personals where p.Id == con.PersonalId select p.DNI).FirstOrDefaultAsync();

            if (dni == null) return NotFound("No existeix la Persona amb l'ID indicat.");

            consulta.DNIPersonal = dni;

            return Ok(consulta);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ConsultaCreateDTO>> PostConsulta([FromBody] ConsultaCreateDTO userConDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var personal = await (from p in _bbdd.Personals where p.DNI == userConDTO.DNIPersonal select p).FirstOrDefaultAsync();
            var episodi = await _bbdd.EpisodisMedics.FindAsync(userConDTO.EpisodiMedicId);

            if (personal == null) return BadRequest("No existeix cap metge amb l'ID indicat.");
            if (episodi == null) return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");

            Consulta consulta = _mapper.Map<Consulta>(userConDTO);
            consulta.PersonalId = personal.Id;
            consulta.EpisodiMedicId = episodi.Id;

            await _bbdd.Consultes.AddAsync(consulta);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConsulta), new { id = consulta.Id }, userConDTO);

        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Format d'ID incorrecte.");
                return BadRequest("Format d'ID incorrecte.");
            }

            var consulta = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (consulta == null)
            {
                _logger.LogError("ID de consulta no trobat.");
                return NotFound("ID de consulta no trobat.");
            }

            _bbdd.Consultes.Remove(consulta);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Consulta borrada exitosament.");
            return NoContent();
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCon(int id, [FromBody] ConsultaReadDTO userConDTO)
        {
            if (userConDTO == null || id != userConDTO.Id) return BadRequest("No existeix la ID indicada.");

            var existeixCon = await _bbdd.Consultes.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

            if (existeixCon == null)
            {
                _logger.LogError("No existeix consulta amb aquest ID.");
                return NotFound("No existeix consulta amb aquest ID.");
            }

            Consulta consulta = _mapper.Map<Consulta>(userConDTO);

            var personal = await (from p in _bbdd.Personals where p.DNI == userConDTO.DNIPersonal select p).FirstOrDefaultAsync();
            var episodi = await _bbdd.EpisodisMedics.FindAsync(userConDTO.EpisodiMedicId);

            if (personal == null) return BadRequest("No existeix cap metge amb l'ID indicat.");
            if (episodi == null) return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");

            consulta.PersonalId = personal.Id;
            consulta.EpisodiMedicId = episodi.Id;

            _bbdd.Consultes.Update(consulta);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }

    }
}
