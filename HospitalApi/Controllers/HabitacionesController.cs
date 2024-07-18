using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalApi.Models;

namespace HospitalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitacionesController : ControllerBase
    {
        private readonly HospitalContext _context;

        public HabitacionesController(HospitalContext context)
        {
            _context = context;
        }

        // GET: api/Habitaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habitaciones>>> GetHabitaciones()
        {
            return await _context.Habitaciones.ToListAsync();
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

        // PUT: api/Habitaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabitacion(long id, Habitaciones habitacion)
        {
            if (id != habitacion.Id)
            {
                return BadRequest("El id no está relacionado correctamente con la habitación");
            }

            _context.Entry(habitacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitacionExists(id))
                {
                    return NotFound("No existe ninguna habitación con el id selecionado");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Habitaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Habitaciones>> PostHabitacion(HabitacionDTO habitacionDto)
        {
            var habitacion = new Habitaciones
            {
                Capacity = habitacionDto.Capacity
            };

            _context.Habitaciones.Add(habitacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHabitaciones), new { id = habitacion.Id }, habitacion);
        }

        // DELETE: api/Habitaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabitacion(long id)
        {
            var habitacion = await _context.Habitaciones.FindAsync(id);
            if (habitacion == null)
            {
                return NotFound("No existe ninguna habitación con el id selecionado");
            }

            _context.Habitaciones.Remove(habitacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HabitacionExists(long id)
        {
            return _context.Habitaciones.Any(e => e.Id == id);
        }
    }
}

