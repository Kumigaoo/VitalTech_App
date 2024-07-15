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
        return await _context.Habitaciones
            .Include(h => h.Camas)  // Incluir camas en la consulta
            .ToListAsync();
    }

        // GET: api/Habitaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habitaciones>> GetHabitacion(long id)
    {
        var habitacion = await _context.Habitaciones
            .Include(h => h.Camas)  // Incluir camas en la consulta
            .FirstOrDefaultAsync(h => h.Id == id);

        if (habitacion == null)
        {
            return NotFound();
        }

        return habitacion;
    }

        // PUT: api/Habitaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabitaciones(long id, Habitaciones habitaciones)
        {
            if (id != habitaciones.Id)
            {
                return BadRequest();
            }

            _context.Entry(habitaciones).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitacionesExists(id))
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

        // POST: api/Habitaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Habitaciones>> CreateHabitacion(HabitacionDTO habitacionDto)
{
    var habitacion = new Habitaciones
    {
        Capacity = habitacionDto.Capacity
    };

    _context.Habitaciones.Add(habitacion);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetHabitaciones), new { id = habitacion.Id }, habitacion);
}

[HttpPost("{habitacionId}/camas")]
public async Task<ActionResult<Habitaciones>> AddCamaToHabitacion(long habitacionId, CamaDTO camaDto)
{
    var habitacion = await _context.Habitaciones.FindAsync(habitacionId);
    if (habitacion == null)
    {
        return NotFound("Habitacion no encontrada");
    }

    var cama = new Camas
    {
        Estat = camaDto.Estat,
        HabitacionId = habitacionId
    };

    habitacion.Camas.Add(cama);

    _context.Camas.Add(cama);
    await _context.SaveChangesAsync();

    return NoContent();
}

        // DELETE: api/Habitaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabitaciones(long id)
        {
            var habitaciones = await _context.Habitaciones.FindAsync(id);
            if (habitaciones == null)
            {
                return NotFound();
            }

            _context.Habitaciones.Remove(habitaciones);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HabitacionesExists(long id)
        {
            return _context.Habitaciones.Any(e => e.Id == id);
        }
    }
}
