using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class IngresController : ControllerBase
    {

        private readonly ILogger<IngresController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public IngresController(ILogger<IngresController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<IngresDTO>>> GetIngressos()
        {

            _logger.LogInformation("Obtenint els ingressos");
            IEnumerable<Ingres> ingresList = await _bbdd.Ingressos.Include("EpisodiMedic").Include("Llit").ToListAsync();
            return Ok(_mapper.Map<IEnumerable<IngresDTO>>(ingresList));

        }


        [HttpGet("id", Name = "GetIngres")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IngresDTO>> GetIngres(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: format de ID incorrecte.");
                return BadRequest();
            }

            var ingres = await _bbdd.Ingressos.FirstOrDefaultAsync(h => h.Id == id);


            if (ingres == null)
             { 
                return NotFound();
                _logger.LogInformation("Error: no existeix l'ID indicat.");
            }
            return Ok(_mapper.Map<IngresDTO>(ingres));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IngresCreateDTO>> PostIngres([FromBody] IngresCreateDTO userIngresDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var llit = await _bbdd.Ingressos.FindAsync(userIngresDTO.LlitId);
            var episodi = await _bbdd.Ingressos.FindAsync(userIngresDTO.EpisodiMedicId);

            if (llit == null) return BadRequest("El LlitId proporcionat no existeix.");
            if (episodi == null) return BadRequest("El EpisodiMedicId proporcionat no existeix.");

            Ingres ingres = _mapper.Map<Ingres>(userIngresDTO);
            ingres.LlitId = llit.Id;
            ingres.EpisodiMedicId = episodi.Id;

            await _bbdd.Ingressos.AddAsync(ingres);
            await _bbdd.SaveChangesAsync();

            return CreatedAtRoute("GetIngres", _mapper.Map<IngresCreateDTO>(ingres));

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteIngres(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: format de dades introduïdes incorrecte.");
                return BadRequest(ModelState);
            }

            var ingres = await _bbdd.Ingressos.FirstOrDefaultAsync(h => h.Id == id);


            if (ingres == null)
             {
                  _logger.LogError("Error: ingrés indicat no trobat.");
                    return NotFound();
             }


            _bbdd.Ingressos.Remove(ingres);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Ingrés esborrat exitosament.");
            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateIngres(int id, [FromBody] IngresDTO userIngresDTO)
        {

            if (userIngresDTO.Id == null){
                    _logger.LogError("Error: Id indicat no trobat.");
                    return BadRequest();
            }

            Ingres ingres = _mapper.Map<Ingres>(userIngresDTO);

            _bbdd.Ingressos.Update(ingres);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Modificació efectuada correctament.");
            return NoContent();

        }
    }
}
