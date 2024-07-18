using HospitlaXD.DTO;
using Microsoft.AspNetCore.Mvc;
using HospitalXD.Data;
using Microsoft.EntityFrameworkCore;
using HospitalXD.Models;

namespace HospitlaXD.Controllers
{

    [Route("api/[controller]")]
    [Controller]
    public class LlitsController : ControllerBase
    {

        private readonly ILogger<LlitsController> _logger;
        private readonly ApplicationDbContext _bbdd;

        public LlitsController(ILogger<LlitsController> logger, ApplicationDbContext bbdd)
        {

            _logger = logger;
            _bbdd = bbdd;

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Llit>> GetLlits()
        {

            var llits = await _bbdd.Llit.ToListAsync();

            return Ok(llits);

        }


        [HttpGet("{id:int}", Name = "LlitId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Llit>> GetLlitsId(int id)
        {

            var llitRefId = await _bbdd.Llit.FirstOrDefaultAsync(o => o.Id == id);


            if (llitRefId == null)
            {

                return NotFound();

            }
            else
            {

                return Ok(llitRefId);

            }


        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteLlit(int id)
        {

            var operacio = await _bbdd.Llit.Where(o => o.Id == id).ExecuteDeleteAsync();

            if (operacio == null)
            {
                return NotFound();
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost("{Llit:Object}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> PostLlit([FromBody] Llit llit)
        {
            if (llit == null)
            {
                return BadRequest("El objeto 'llit' no puede ser nulo.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _bbdd.Llit.AddAsync(llit);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerLlitPorId), new { id = llit.Id }, llit);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutLlit(int id, [FromBody] Llit llit)
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
                    return NotFound();
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