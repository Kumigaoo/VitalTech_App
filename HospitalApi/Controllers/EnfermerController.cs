using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Authorization;

//using EntityFrameworkCore.MySQL.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalApi.Controllers
{

    [Route("api/[controller]")]
    [Authorize]
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
            IEnumerable<Enfermer> enfermersList = await _bbdd.Enfermer.ToListAsync();

            return Ok(_mapper.Map<IEnumerable<EnfermerReadDTO>>(enfermersList));

        }

        [HttpGet("{DNI}", Name = "GetEnfermer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EnfermerReadDTO>> GetEnfermer(string DNI)
        {

            var enfermer = await _bbdd.Enfermer.FirstOrDefaultAsync(e => e.DNI == DNI);

            return Ok(_mapper.Map<EnfermerReadDTO>(enfermer));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EnfermerCreateDTO>> PostEnfermer([FromBody] EnfermerCreateDTO nouEnfermer)
        {

            Enfermer enfermer = _mapper.Map<Enfermer>(nouEnfermer);

            await _bbdd.Enfermer.AddAsync(enfermer);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEnfermer), new { id = nouEnfermer.DNI }, nouEnfermer);

        }

        [HttpDelete("{DNI}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEnfermer(string DNI)
        {

            var enfermer = await _bbdd.Enfermer.FirstOrDefaultAsync(e => e.DNI == DNI);

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

            var enfermer = await _bbdd.Enfermer.FirstOrDefaultAsync(e => e.DNI == DNI);

            if (enfermer == null)
            {
                _logger.LogError("Error: no existeix enfermer amb el DNI indicat.");
                return NotFound("Error: no existeix enfermer amb el DNI indicat.");
            }

            _mapper.Map(enfermerUpdateDTO, enfermer);

            _bbdd.Enfermer.Update(enfermer);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Pacient modificat exitosament.");
            return NoContent();

        }

    }

}