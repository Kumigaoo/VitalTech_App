using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.JSInterop.Infrastructure;

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
            _logger.LogInformation("Obtenint el personal");

            IEnumerable<Personal> perList = await _bbdd.Personals.Include("Consultes").ToListAsync();


            return Ok(_mapper.Map<IEnumerable<PersonalDTO>>(perList));
        }

        [HttpGet("{id}", Name = "GetPer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PersonalDTO>> GetPersonal(string id)
        {
            if (id.Length < 9)
            {
                _logger.LogError("Format de ID incorrecte.");
                return BadRequest();
            }

            var per = await _bbdd.Personals.FirstOrDefaultAsync(h => h.DNI == id);

            if (per == null)
            {
                _logger.LogError("No existeix cap empleat amb l'ID: " + id);
                return NotFound("No existeix cap empleat amb l'ID: " + id);
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
            
            
            if (userPerDTO.DNI.Length < 9)
            {
                _logger.LogError("Format de DNI incorrecte.");
                return BadRequest("Format de DNI incorrecte.");
            }

            Personal personal = _mapper.Map<Personal>(userPerDTO);

            await _bbdd.Personals.AddAsync(personal);
            await _bbdd.SaveChangesAsync();

            return StatusCode(201, "Personal creada satisfactoriamente");

        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePersonal(string id)
        {
        
            var personal = await _bbdd.Personals.FirstOrDefaultAsync(h => h.DNI == id);

            if (personal == null)
            {
                _logger.LogError("ID de personal no trobat.");
                return NotFound("ID de personal no trobat.");
            }

            _bbdd.Personals.Remove(personal);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Personal esborrat amb �xit.");
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePer(string id, [FromBody] PersonalCreateDTO userPerDTO)
        {
            if (userPerDTO.DNI == null || id != userPerDTO.DNI)
                return BadRequest();
            Personal personal = _mapper.Map<Personal>(userPerDTO);

            var existeixPersonal = await _bbdd.Personals.AsNoTracking().FirstOrDefaultAsync(p => p.DNI == id);

            if (existeixPersonal == null){
                _logger.LogError("No existeix personal amb aquest ID.");
                return NotFound("No existeix personal amb aquest ID.");
            }

            _bbdd.Personals.Update(personal);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdatePerTotal (string id, JsonPatchDocument<PersonalDTO> patchDto)
        {
            if (patchDto == null || id.Length < 9)
            {
                _logger.LogError("Error: no existeix l'empleat amb el ID indicat.");
                return BadRequest("Error: no existeix l'empleat amb el ID indicat.");
            }

            var personal = await _bbdd.Personals.AsNoTracking().FirstOrDefaultAsync(v => v.DNI == id);

            PersonalDTO personaldto = _mapper.Map<PersonalDTO>(personal);

            patchDto.ApplyTo(personaldto, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Personal modelo = _mapper.Map<Personal>(personaldto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Empleat actualitzat.");
            return NoContent();

        }

    }
}
