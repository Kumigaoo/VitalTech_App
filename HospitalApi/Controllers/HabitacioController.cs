using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitacioController : ControllerBase
    {
        private readonly ILogger<HabitacioController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public HabitacioController(
            ILogger<HabitacioController> logger,
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
        public async Task<ActionResult<IEnumerable<HabitacioDTO>>> GetHabitacions()
        {
            _logger.LogInformation("Obtenint les habitacions");

            IEnumerable<Habitacio> habList = await _bbdd
                .Habitacions.Include("Planta")
                .Include("Llits")
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<HabitacioDTO>>(habList));
        }

        [HttpGet("{id:int}", Name = "GetHab")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetHabitacio(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Error: format d'ID incorrecte.");
                return BadRequest("Error: format d'ID incorrecte.");
            }

            var hab = await _bbdd.Habitacions.FirstOrDefaultAsync(h => h.CodiHabitacio == id);

            if (hab == null)
            {
                _logger.LogError("Error: no existeix l'habitació amb l'ID indicat.");
                return NotFound("Error: no existeix l'habitació amb l'ID indicat.");
            }

            _logger.LogError("Habitació recuperada exitosament.");
            return Ok(_mapper.Map<HabitacioDTO>(hab));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<HabitacioCreateDTO>> PostHabitacio(
            [FromBody] HabitacioCreateDTO userHabDTO
        )
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest(ModelState);
            }

            if (userHabDTO.CodiHabitacio < 100 || userHabDTO.CodiHabitacio > 999)
            {
                _logger.LogError("Error: format d'ID incorrecte.");
                return BadRequest(ModelState);
            }

            var planta = await _bbdd
                .Plantes.Include(h => h.Habitacions)
                .FirstOrDefaultAsync(h => h.Id == userHabDTO.PlantaId);

            if (planta == null)
            {
                _logger.LogError("Error: no existeix la planta indicada.");
                return NotFound("Error: no existeix la planta indicada.");
            }

            if (planta.Habitacions == null)
            {
                planta.Habitacions = new List<Habitacio>();
            }

            if (planta.Habitacions.Count >= planta.CapacitatHabitacions)
            {
                _logger.LogError("No es poden agregar més habitacions a aquesta planta.");
                return BadRequest("No es poden agregar més habitacions a aquesta planta.");
            }

            Habitacio habitacio = _mapper.Map<Habitacio>(userHabDTO);
            habitacio.PlantaId = planta.Id;

            await _bbdd.Habitacions.AddAsync(habitacio);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Habitació creada correctament.");
            return CreatedAtRoute("GetHab", _mapper.Map<HabitacioCreateDTO>(habitacio));
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteHabitacio(int id)
        {
            if (id < 100 || id > 999)
            {
                _logger.LogError("Error: format d'ID incorrecte.");
                return BadRequest(ModelState);
            }
            var hab = await _bbdd.Habitacions.FirstOrDefaultAsync(h => h.CodiHabitacio == id);

            if (hab == null)
            {
                _logger.LogError("Error: no existeix la habitació amb l'ID indicat.");
                return NotFound("Error: no existeix la habitació amb l'ID indicat.");
            }

            var llits = await _bbdd.Llits.FirstOrDefaultAsync(h => h.HabitacioId == id);

            if (llits != null)
            {
                _logger.LogError("Error: no es pot esborrar una habitació que conté llits.");
                return BadRequest("Error: no es pot esborrar una habitació que conté llits.");
            }

            _bbdd.Habitacions.Remove(hab);
            await _bbdd.SaveChangesAsync();

            _logger.LogError("Habitació eliminada amb èxit.");
            return NoContent();
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateHabitacio(int id, [FromBody] HabitacioCreateDTO userHabDTO)
        {
            if (userHabDTO == null || id != userHabDTO.CodiHabitacio)
            {
                _logger.LogError("Error: ID indicat invàlid.");
                return BadRequest("Error: ID indicat invàlid.");
            }

            var existeixHab = await _bbdd.Habitacions.AsNoTracking().FirstOrDefaultAsync(p => p.CodiHabitacio == id);

            if (existeixHab == null){
                _logger.LogError("No existeix habitació amb aquest ID.");
                return NotFound("No existeix habiatció amb aquest ID.");
            }

            Habitacio habitacio = _mapper.Map<Habitacio>(userHabDTO);

            _bbdd.Habitacions.Update(habitacio);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Habitació modificada exitosament.");
            return NoContent();
        }

        [HttpPatch("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdateParcialHabitacio(int id, JsonPatchDocument<HabitacioDTO> patchDto)
        {
            if (patchDto == null || id <= 0)
            {
                _logger.LogError("Error: no existeix l'habitació amb el ID indicat.");
                return BadRequest("Error: no existeix l'habitació amb el ID indicat.");
            }

            var habitacio = await _bbdd.Habitacions.AsNoTracking().FirstOrDefaultAsync(v => v.CodiHabitacio == id);

            if (habitacio == null)
            {
                _logger.LogError("No existeix habitació amb aquest ID.");
                return NotFound("No existeix habitació amb aquest ID.");
            }

            HabitacioDTO habitaciodto = _mapper.Map<HabitacioDTO>(habitacio);

            patchDto.ApplyTo(habitaciodto, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Habitacio modelo = _mapper.Map<Habitacio>(habitaciodto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Habitació actualitzada.");
            return NoContent();
        }
    }
}
