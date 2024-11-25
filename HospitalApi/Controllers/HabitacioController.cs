using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class HabitacioController : ControllerBase
    {
        private readonly ILogger<HabitacioController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public HabitacioController(ILogger<HabitacioController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HabitacioReadDTO>>> GetHabitacions()
        {
            _logger.LogInformation("Obtenint les habitacions");

            IEnumerable<Habitacio> habList = await _bbdd
                .Habitacions.Include("Planta")
                .Include("Llits")
                .ToListAsync();
            IEnumerable<HabitacioReadDTO> habitacions = _mapper.Map<IEnumerable<HabitacioReadDTO>>(habList);

            for (int i = 0; i < habitacions.Count(); i++){
                var codi = await (from h in _bbdd.Plantes where h.Id == habList.ElementAt(i).PlantaId select h.Piso).FirstOrDefaultAsync();
                if (codi == null) { continue; }
                habitacions.ElementAt(i).PlantaId = codi;
            }

            return Ok(habitacions);
        }

        [HttpGet("{id:int}", Name = "GetHab")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioReadDTO>> GetHabitacio(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Error: format d'ID incorrecte.");
                return BadRequest("Error: format d'ID incorrecte.");
            }

            var hab = await _bbdd.Habitacions
            .Include(l => l.Planta)
            .Include(l => l.Llits).FirstOrDefaultAsync(h => h.CodiHabitacio == id);

            if (hab == null)
            {
                _logger.LogError("Error: no existeix l'habitació amb l'ID indicat.");
                return NotFound("Error: no existeix l'habitació amb l'ID indicat.");
            }

            var habitacioReadDTO = _mapper.Map<HabitacioReadDTO>(hab);
            if(hab.Planta != null){
                habitacioReadDTO.PlantaId = hab.Planta.Piso;
            }
            _logger.LogInformation("Habitació recuperada exitosament.");
            return Ok(habitacioReadDTO);
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
                .FirstOrDefaultAsync(p => p.Piso == userHabDTO.PlantaId);

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

            return CreatedAtAction(nameof(GetHabitacio), new { id = userHabDTO.CodiHabitacio }, userHabDTO);

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
            if (userHabDTO == null || id < 100 || id > 999)
            {
                _logger.LogError("Error: ID indicat invàlid.");
                return BadRequest("Error: ID indicat invàlid.");
            }

            var hab = await _bbdd.Habitacions
                .Include(h => h.Planta)  
                .FirstOrDefaultAsync(h => h.CodiHabitacio == id);
           
            if (hab == null){
                _logger.LogError("No existeix habitació amb aquest ID.");
                return NotFound("No existeix habiatció amb aquest ID.");
            }

            var piso = await _bbdd.Plantes
                .Include(p => p.Habitacions)  
                .FirstOrDefaultAsync(p => p.Piso == userHabDTO.PlantaId);
            
            if (piso == null){
                _logger.LogError("No existeix planta amb aquest ID.");
                return NotFound("No existeix planta amb aquest ID.");
            }

            hab.Planta = piso;
            _mapper.Map(userHabDTO, hab);

            hab.PlantaId = piso.Id;

            _bbdd.Habitacions.Update(hab);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Habitació modificada exitosament.");
            return NoContent();
        }

        
    }
}
