
using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PruebasDiagnosticasController : ControllerBase
    {
        private readonly ILogger<PruebasDiagnosticasController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public PruebasDiagnosticasController(
            ILogger<PruebasDiagnosticasController> logger,
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
        public async Task<ActionResult<IEnumerable<PruebaDiagnosticaReadDTO>>> GetConsultes()
        {
            _logger.LogInformation("Obtenint les consultes");

            IEnumerable<PruebasDiagnosticas> conList = await _bbdd
                .PruebasDiagnosticas
                .Include("Metge")
                .Include("Enfermer")
                .Include("EpisodiMedic")
                .ToListAsync();

            IEnumerable<PruebaDiagnosticaReadDTO> consultes = _mapper.Map<IEnumerable<PruebaDiagnosticaReadDTO>>(conList);

            for (int i = 0; i < consultes.Count(); i++)
            {
                var dnim = await (from p in _bbdd.Metges where p.Id == conList.ElementAt(i).MetgeId select p.DNI).FirstOrDefaultAsync();
                var dnie = await (from p in _bbdd.Enfermer where p.Id == conList.ElementAt(i).EnfermerId select p.DNI).FirstOrDefaultAsync();
                if (dnim == null || dnie == null) { continue; }
                consultes.ElementAt(i).DNIMetge = dnim;
                consultes.ElementAt(i).DNIEnfermer = dnie;
            }

            return Ok(consultes);

        }
        [HttpGet("{id:int}", Name = "GetCon")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PruebaDiagnosticaReadDTO>> GetConsulta(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Format d'ID incorrecte.");
                return BadRequest("Format d'ID incorrecte.");
            }

            var con = await _bbdd.PruebasDiagnosticas.FirstOrDefaultAsync(h => h.Id == id);

            if (con == null)
            {
                _logger.LogError("No existeix una consulta amb l'ID indicat.");
                return NotFound("No existeix una consulta amb l'ID indicat.");
            }

            PruebaDiagnosticaReadDTO consulta = _mapper.Map<PruebaDiagnosticaReadDTO>(con);
            var dni = await (from p in _bbdd.Metges where p.Id == con.MetgeId select p.DNI).FirstOrDefaultAsync();
            var dnie = await (from p in _bbdd.Enfermer where p.Id == con.EnfermerId select p.DNI).FirstOrDefaultAsync();

            if (dni == null|| dnie == null) return NotFound("No existeix la Persona amb l'ID indicat.");

            consulta.DNIMetge = dni;
            consulta.DNIEnfermer = dnie;

            return Ok(consulta);
        }
        

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PruebaDiagnosticaCreateDTO>> PostConsulta([FromBody] PruebaDiagnosticaCreateDTO userConDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var metge = await (from p in _bbdd.Metges where p.Id == userConDTO.MetgeId select p).FirstOrDefaultAsync();
            var enfermer = await (from p in _bbdd.Enfermer where p.Id == userConDTO.EnfermerId select p).FirstOrDefaultAsync(); 
            var episodi = await _bbdd.EpisodisMedics.FindAsync(userConDTO.EpisodiMedicId);

            if (metge == null) return BadRequest("No existeix cap metge amb l'ID indicat.");
            if (enfermer == null)return BadRequest("No existeix cap enfermer amb l'ID indicat");
            if (episodi == null) return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");

            PruebasDiagnosticas consulta = _mapper.Map<PruebasDiagnosticas>(userConDTO);
            consulta.EnfermerId = enfermer.Id;
            consulta.MetgeId = metge.Id;
            consulta.EpisodiMedicId = episodi.Id;

            await _bbdd.PruebasDiagnosticas.AddAsync(consulta);
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

            var consulta = await _bbdd.PruebasDiagnosticas.FirstOrDefaultAsync(h => h.Id == id);

            if (consulta == null)
            {
                _logger.LogError("ID de consulta no trobat.");
                return NotFound("ID de consulta no trobat.");
            }

            _bbdd.PruebasDiagnosticas.Remove(consulta);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Consulta borrada exitosament.");
            return NoContent();
        }
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCon(int id, [FromBody] PruebaDiagnosticaCreateDTO userConDTO)
        {
            if (userConDTO == null ) return BadRequest("No existeix la ID indicada.");

            var existeixCon = await _bbdd.PruebasDiagnosticas.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

            if (existeixCon == null)
            {
                _logger.LogError("No existeix consulta amb aquest ID.");
                return NotFound("No existeix consulta amb aquest ID.");
            }

            PruebasDiagnosticas consulta = _mapper.Map<PruebasDiagnosticas>(userConDTO);

            var metge = await (from p in _bbdd.Metges where p.Id == userConDTO.MetgeId select p).FirstOrDefaultAsync();
            var enfermer = await (from p in _bbdd.Enfermer where p.Id == userConDTO.EnfermerId select p).FirstOrDefaultAsync();
            var episodi = await _bbdd.EpisodisMedics.FindAsync(userConDTO.EpisodiMedicId);

            if (metge == null) return BadRequest("No existeix cap metge amb l'ID indicat.");
            if(enfermer == null) return BadRequest("No existeix cap enfermer amb l'ID indicat.");
            if (episodi == null) return BadRequest("No existeix cap episodi mèdic amb l'ID indicat.");

            consulta.EnfermerId = enfermer.Id;
            consulta.MetgeId = metge.Id;
            consulta.EpisodiMedicId = episodi.Id;

            _bbdd.PruebasDiagnosticas.Update(consulta);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }
        
    }
}
