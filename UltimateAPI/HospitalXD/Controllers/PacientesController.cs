/*
using HospitalXD.DTO;
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
        public async Task<ActionResult<HospitalXD.Models.Pacient>> GetPacients()
        {
            if (_bbdd.Pacients.IsNullOrEmpty()){
                return NoContent();
            }

            var pacient = await _bbdd.Pacients
            .Include(p => p.Consultes)
            .ThenInclude(c => c.EpisodiMedic)
            .ToListAsync();

            return Ok(pacient);

        }


        [HttpGet("{id:int}", Name = "PacientId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HospitalXD.Models.Pacient>> GetPacientsId(int id)
        {

            var PacientRefId = await _bbdd.Pacients
            .Include(p => p.Consultes)
            .ThenInclude(c => c.EpisodiMedic)
            .FirstOrDefaultAsync(p => p.Id == id);


            if (PacientRefId == null)
            {

                return NotFound("No existe ninguna paciente con el id selecionado");

            }

                return Ok(PacientRefId);



        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePacient(int id)
        {

            var operacio = await _bbdd.Pacients.Where(o => o.Id == id).ExecuteDeleteAsync();

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
        
        public async Task<IActionResult> Postpacient([FromBody] HospitalXD.Models.Pacient pacients)
        {
            if (pacients == null)
            {
                return BadRequest("El objeto 'pacient' no puede ser nulo.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cama = _bbdd.Llits.FirstOrDefault(h => h.Id == pacients.Id);

            if (cama == null) {
                return NotFound("Cama no encontrada");
            }

            Pacient pacient = new(){
                Nom = pacients.Nom,
                Id = pacients.Id,
                NumSS = pacients.NumSS,
                Estat = pacients.Estat,
                Sexe = pacients.Sexe
            };

            await _bbdd.Pacients.AddAsync(pacient);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(pacient), new { id = pacient.Id }, pacient);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutPacient(int id, [FromBody] HospitalXD.Models.Pacient pacients)
        {
            if (pacients == null || id != pacients.Id)
            {
                return BadRequest("Datos no válidos.");
            }

            _bbdd.Entry(pacients).State = EntityState.Modified;

            try
            {
                await _bbdd.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacientsExists(id))
                {
                    return NotFound("No existe ningun paciente con el id selecionado");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool PacientsExists(int id)
        {
            return _bbdd.Pacients.Any(e => e.Id == id);
        }

    }
}

*/