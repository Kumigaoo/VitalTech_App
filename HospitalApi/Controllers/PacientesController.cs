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
    public class PacientesController : ControllerBase
    {
        private readonly HospitalContext _context;

        public PacientesController(HospitalContext context)
        {
            _context = context;
        }

        // GET: api/Pacientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pacientes>>> GetPacientes()
        {
            return await _context.Pacientes.ToListAsync();
        }

        // GET: api/Pacientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pacientes>> GetPacientes(long id)
        {
            var pacientes = await _context.Pacientes.FindAsync(id);

            if (pacientes == null)
            {
                return NotFound();
            }

            return pacientes;
        }

        // PUT: api/Pacientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPacientes(long id, Pacientes pacientes)
        {
            if (id != pacientes.Id)
            {
                return BadRequest();
            }

            _context.Entry(pacientes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacientesExists(id))
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

        // POST: api/Pacientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pacientes>> PostPaciente(PacienteDTO pacienteDto)
{
    var cama = await _context.Camas.FindAsync(pacienteDto.CamaId);
    if (cama == null)
    {
        return NotFound("Cama no encontrada");
    }

    var paciente = new Pacientes
    {
        Name = pacienteDto.Name,
        DNI = pacienteDto.DNI,
        NumSS = pacienteDto.NumSS,
        Estat = pacienteDto.Estat,
        CamaId = pacienteDto.CamaId
    };

    cama.Paciente = paciente;

    _context.Pacientes.Add(paciente);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetPacientes), new { id = paciente.Id }, paciente);
}

        // DELETE: api/Pacientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePacientes(long id)
        {
            var pacientes = await _context.Pacientes.FindAsync(id);
            if (pacientes == null)
            {
                return NotFound();
            }

            _context.Pacientes.Remove(pacientes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PacientesExists(long id)
        {
            return _context.Pacientes.Any(e => e.Id == id);
        }
    }
}
