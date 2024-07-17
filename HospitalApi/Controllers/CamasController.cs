using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace HospitalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CamasController : ControllerBase
    {
        private readonly HospitalContext _context;

        public CamasController(HospitalContext context)
        {
            _context = context;
        }

        // GET: api/Camas
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<Camas>>> GetCamas()
        {
            if ( _context.Camas.IsNullOrEmpty())
            {
                return NoContent();
            }
            else
            {
                return Ok(await _context.Camas
                    .Include(c => c.Habitacion) // Incluir la información de la habitación relacionada
                    .ToListAsync());
            }
        }

        // GET: api/Camas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Camas>> GetCamas(long id)
        {
            var camas = await _context.Camas
                .Include(c => c.Habitacion) // Incluir la información de la habitación relacionada
                .FirstOrDefaultAsync(c => c.Id == id);

            if (camas == null)
            {
                return NotFound("No existe ninguna cama con el id selecionado");
            }

            return camas;
        }


        // PUT: api/Camas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCamas(long id, Camas camas)
        {
            if (id != camas.Id)
            {
                return BadRequest("El id no está relacionado correctamente con la cama");
            }

            _context.Entry(camas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CamasExists(id))
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

        // POST: api/Camas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Camas>> PostCamas(CamaDTO camasDto)
        {

            var habitacion = await _context.Habitaciones.FindAsync(camasDto.HabitacionId);
            if (habitacion == null)
            {
                return NotFound("Habitación no encontrada");
            }
            var cama = new Camas
            {
                Estat = camasDto.Estat,
                HabitacionId = camasDto.HabitacionId,
                Habitacion = habitacion,


            };

            _context.Camas.Add(cama);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCamas), new { id = cama.Id }, cama);
        }

        // DELETE: api/Camas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCamas(long id)
        {
            var camas = await _context.Camas.FindAsync(id);
            if (camas == null)
            {
                return NotFound("No existe ninguna cama con el id selecionado");
            }

            _context.Camas.Remove(camas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CamasExists(long id)
        {
            return _context.Camas.Any(e => e.Id == id);
        }
    }
}
