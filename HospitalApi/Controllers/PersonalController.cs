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
            _logger.LogInformation("Obteint el personal");

            IEnumerable<Personal> perList = await _bbdd.Personals.ToListAsync();

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

            var per = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.Id == id);

            if (per == null)
            {
                _logger.LogError("No existe Personal con el ID: " + id);
                return NotFound(per);
            }
            return Ok(_mapper.Map<PersonalDTO>(per));
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

            Personal personal = _mapper.Map<Personal>(userPerDTO);

            await _bbdd.Personals.AddAsync(personal);
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

            var personal = await _bbdd.Personals.FirstOrDefaultAsync(h => h.Id == id);

            if (personal == null)
            {
                _logger.LogError("Id de personal no encontrado");
                return NotFound();
            }

            _bbdd.Personals.Remove(personal);
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

            _bbdd.Personals.Update(personal);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }
    }
}
