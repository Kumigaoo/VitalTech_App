using HospitlaXD.DTO;
using Microsoft.AspNetCore.Mvc;
using HospitalXD.Data;
using Microsoft.EntityFrameworkCore;
using HospitalXD.Models;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;

namespace HospitlaXD.Controllers
{

    [Route("api/[controller]")]
    [Controller]
    public class PacientesController : ControllerBase
    {

        private readonly ILogger<PacientesController> _logger;
        private readonly ApplicationDbContext _bbdd;

        public PacientesController(ILogger<PacientesController> logger, ApplicationDbContext bbdd)
        {

            _logger = logger;
            _bbdd = bbdd;

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<HospitalXD.Models.Pacients>> GetPacients()
        {
            if (_bbdd.Pacients.IsNullOrEmpty()){
                return NoContent();
            }

            var pacient = await _bbdd.Pacients
            .Include(p => p.Cama)
            .ThenInclude(c => c.Habitacion)
            .ToListAsync();

            return Ok(pacient);

        }


        [HttpGet("{id:int}", Name = "LlitId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HospitalXD.Models.Llit>> GetLlitsId(int id)
        {

            var llitRefId = await _bbdd.Llit
            .Include(o => o.Habitacion)
            .FirstOrDefaultAsync(o => o.Id == id);


            if (llitRefId == null)
            {

                return NotFound("No existe ninguna cama con el id selecionado");

            }

                return Ok(llitRefId);



        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteLlit(int id)
        {

            var operacio = await _bbdd.Llit.Where(o => o.Id == id).ExecuteDeleteAsync();

            if (operacio == null)
            {
                return NotFound("No existe ninguna cama con el id selecionado");
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost("{Llit:Object}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        
        public async Task<IActionResult> PostLlit([FromBody] HospitalXD.Models.Llit llit)
        {
            if (llit == null)
            {
                return BadRequest("El objeto 'llit' no puede ser nulo.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var hab = _bbdd.Habitacions.FirstOrDefault(h => h.Id == llit.Id);

            if (hab == null) {
                return NotFound("Habitación no encontrada");
            }

            Llit llits = new(){
                Estat = llit.Estat,
                NumHabitacio = llit.NumHabitacio,
                Habitacion = hab,
            };

            await _bbdd.Llit.AddAsync(llits);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(llits), new { id = llits.Id }, llits);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutLlit(int id, [FromBody] HospitalXD.Models.Llit llit)
        {
            if (llit == null || id != llit.Id)
            {
                return BadRequest("Datos no válidos.");
            }

            _bbdd.Entry(llit).State = EntityState.Modified;

            try
            {
                await _bbdd.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LlitExists(id))
                {
                    return NotFound("No existe ninguna cama con el id selecionado");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool LlitExists(int id)
        {
            return _bbdd.Llit.Any(e => e.Id == id);
        }

    }
}