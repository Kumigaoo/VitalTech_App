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
    public class CamasController : ControllerBase
    {
        private readonly HospitalContext _context;

        public CamasController(HospitalContext context)
        {
            _context = context;
        }

        // GET: api/Camas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Camas>>> GetCamas()
        {
            return await _context.Camas.ToListAsync();
        }

        // GET: api/Camas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Camas>> GetCamas(long id)
        {
            var camas = await _context.Camas.FindAsync(id);

            if (camas == null)
            {
                return NotFound();
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
                return BadRequest();
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
                    return NotFound();
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
        public async Task<ActionResult<Camas>> PostCamas(Camas camas)
        {
            _context.Camas.Add(camas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCamas", new { id = camas.Id }, camas);
        }

        // DELETE: api/Camas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCamas(long id)
        {
            var camas = await _context.Camas.FindAsync(id);
            if (camas == null)
            {
                return NotFound();
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
