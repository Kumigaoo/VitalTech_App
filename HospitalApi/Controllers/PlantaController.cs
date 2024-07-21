using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class PlantaController : ControllerBase
    {
        private readonly ILogger<PlantaController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public PlantaController(ILogger<PlantaController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PlantaDTO>>> GetPlantes()
        {

            _logger.LogInformation("Obtenint les habitacions");
            IEnumerable<Planta> plantaList = await _bbdd.Plantes.Include("Habitacions").ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PlantaDTO>>(plantaList));

        }

        [HttpGet("id", Name = "GetPlanta")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetPlanta(int id)
        {

            if (id == 0)
            {
                _logger.LogError("Error, no existeix la planta amb el id " + id);
                return BadRequest();
            }

            var planta = await _bbdd.Plantes.Include("Habitacions").FirstOrDefaultAsync(h => h.Id == id);
            if (planta == null) return NotFound();

            return Ok(_mapper.Map<PlantaDTO>(planta));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PlantaCreateDTO>> PostPlanta([FromBody] PlantaCreateDTO userPlantaDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (userPlantaDTO == null) return BadRequest(userPlantaDTO);

            Planta planta = _mapper.Map<Planta>(userPlantaDTO);

            await _bbdd.Plantes.AddAsync(planta);
            await _bbdd.SaveChangesAsync();

            return CreatedAtRoute("GetPlanta", planta);

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePlanta(int id)
        {
            if (id == 0) return BadRequest(ModelState);

            var planta = await _bbdd.Plantes.FirstOrDefaultAsync(h => h.Id == id);

            if (planta == null) return NotFound();

            _bbdd.Plantes.Remove(planta);
            await _bbdd.SaveChangesAsync();

            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePlanta(int id, [FromBody] PlantaDTO userPlantaDTO)
        {

            if (userPlantaDTO == null || id != userPlantaDTO.Id) return BadRequest();

            Planta planta = _mapper.Map<Planta>(userPlantaDTO);

            _bbdd.Plantes.Update(planta);
            await _bbdd.SaveChangesAsync();

            return NoContent();


        }

    }
}

