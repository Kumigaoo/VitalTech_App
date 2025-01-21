using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;

//using EntityFrameworkCore.MySQL.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalApi.Controllers
{

    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class EnfermerController : ControllerBase
    {
        private readonly ILogger<EnfermerController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public EnfermerController(ILogger<EnfermerController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<EnfermerReadDTO>>> GetEnfermers()
        {
            _logger.LogInformation("Obtenint els enfermers");
            IEnumerable<Enfermer> enfermersList = await _bbdd.Enfermer.Include("PruebasDiagnosticas").ToListAsync();

            return Ok(_mapper.Map<IEnumerable<EnfermerReadDTO>>(enfermersList));

        }

        [HttpGet("{DNI}", Name = "GetEnfermer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EnfermerReadDTO>> GetEnfermer(string DNI)
        {

            var enfermer = await _bbdd.Enfermer.Include("PruebasDiagnosticas").FirstOrDefaultAsync(e => e.DNI == DNI);

            return Ok(_mapper.Map<EnfermerReadDTO>(enfermer));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EnfermerCreateDTO>> PostEnfermer([FromBody] EnfermerCreateDTO nouEnfermer)
        {

            if (!ModelState.IsValid)
            {

                // Si no es válido, devuelve los errores de validación
                var errores = ModelState.Values.SelectMany(v => v.Errors)
                                                .Select(e => e.ErrorMessage)
                                                .ToList();

                return BadRequest(new { errores });

            }

            Enfermer enfermer = _mapper.Map<Enfermer>(nouEnfermer);

            if (enfermer == null)
            {
                // Si no se encuentra el enfermero con el DNI indicado, devuelve NotFound
                _logger.LogError("Error: No existeix enfermer amb el DNI indicat.");
                return NotFound("Error: No existeix enfermer amb el DNI indicat.");
            }

            await _bbdd.Enfermer.AddAsync(enfermer);
            await _bbdd.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete("{DNI}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEnfermer(string DNI)
        {

            var enfermer = await _bbdd.Enfermer.Include("PruebasDiagnosticas").FirstOrDefaultAsync(e => e.DNI == DNI);

            if (enfermer == null)
            {
                _logger.LogError("Error: no existeix enfermer amb el DNI indicat.");
                return NotFound("Error: no existeix enfermer amb el DNI indicat.");
            }

            _bbdd.Enfermer.Remove(enfermer);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Enfermer eliminat exitosament.");
            return NoContent();

        }

        [HttpPut("{DNI}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateEnferemer(string DNI, [FromBody] EnfermerUpdateDTO enfermerUpdateDTO)
        {

            

            if (!ModelState.IsValid)
            {
                // Si no es válido, devuelve los errores de validación
                var errores = ModelState.Values.SelectMany(v => v.Errors)
                                                .Select(e => e.ErrorMessage)
                                                .ToList();

                return BadRequest(new { errores });
            }

            // Buscar el enfermero por el DNI
            var enfermer = await (from e in _bbdd.Enfermer where e.DNI == DNI select e).FirstOrDefaultAsync();

            if (enfermer == null)
            {
                // Si no se encuentra el enfermero con el DNI indicado, devuelve NotFound
                _logger.LogError("Error: No existeix enfermer amb el DNI indicat.");
                return NotFound("Error: No existeix enfermer amb el DNI indicat.");
            }

            // Mapear los cambios del DTO al modelo
            _mapper.Map(enfermerUpdateDTO, enfermer);

            // Actualizar el enfermero en la base de datos
            _bbdd.Enfermer.Update(enfermer);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Enfermer modificat exitosament.");

            // Devolver respuesta sin contenido (204 No Content)
            return NoContent();

        }

    }

}