using AutoMapper;
using Azure;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class EpisodiMedicController : ControllerBase
    {

        private readonly ILogger<EpisodiMedicController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public EpisodiMedicController(ILogger<EpisodiMedicController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<EpisodiMedicDTO>>> GetEpisodisMedics()
        {

            _logger.LogInformation("Obtenint els episodis mèdics");

            IEnumerable<EpisodiMedic> eList = await _bbdd.EpisodisMedics.Include("Pacient").Include("Consultes").Include("Ingressos").ToListAsync();

            return Ok(_mapper.Map<IEnumerable<EpisodiMedicDTO>>(eList));

        }

        [HttpGet("{id:int}", Name = "GetEpi")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EpisodiMedicDTO>> GetEpisodi(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Error, format d'ID incorrecte.");
                return BadRequest("Error, format d'ID incorrecte.");
            } 
        
            var e = await _bbdd.EpisodisMedics.FirstOrDefaultAsync(h => h.Id == id);

            if (e == null)
            {
                _logger.LogError("Error, no existeix l'episodi amb l'ID " + id + ".");
                return NotFound("Error, no existeix l'episodi amb l'ID indicat.");
            }

            _logger.LogInformation("Episodi recuperat exitosament.");
            return Ok(_mapper.Map<EpisodiMedicDTO>(e));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EpisodiMedicCreateDTO>> PostHabitacio([FromBody] EpisodiMedicCreateDTO userEpiDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest(ModelState);
            }

            var pacient = await _bbdd.Pacients.FindAsync(userEpiDTO.PacientId);

            if (pacient == null)
            {
                _logger.LogError("Error: el ID de pacient proporcionat no existeix.");
                return BadRequest("Error: el ID de pacient proporcionat no existeix.");
            }

            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);
            episodi.PacientId = pacient.DNI;

            await _bbdd.EpisodisMedics.AddAsync(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Episodi creat exitosament.");

            return StatusCode(201, "Episodi creada satisfactoriamente");

        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<IActionResult> DeleteEpisodiMedic(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: format de ID incorrecte.");
                return BadRequest(ModelState);
            }

            var epi = await _bbdd.EpisodisMedics.FirstOrDefaultAsync(h => h.Id == id);

            if (epi == null)
            {
                _logger.LogError("Error: no existeix l'episodi mèdic amb l'ID indicat.");
                return NotFound("Error: no existeix l'episodi mèdic amb l'ID indicat.");
            }

            var ingr = await _bbdd.Ingressos.FirstOrDefaultAsync(h => h.EpisodiMedicId == id);   
            
            if (ingr != null)
            {
                _logger.LogError("Error: no es pot esborrar un episodi mèdic que conté ingressos.");
                return BadRequest("Error: no es pot esborrar un episodi mèdic que conté ingressos.");
            }

            var cons = await _bbdd.Consultes.FirstOrDefaultAsync(h => h.EpisodiMedicId == id);

            if (cons != null)
            {
                _logger.LogError("Error: no es pot esborrar un episodi mèdic que conté consultes.");
                return BadRequest("Error: no es pot esborrar un episodi mèdic que conté consultes.");
            }

            _bbdd.EpisodisMedics.Remove(epi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Episodi esborrat amb èxit.");
            return NoContent();

        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateEpisodisMedics(int id, [FromBody] EpisodiMedicUpdateDTO userEpiDTO)
        {

            if (userEpiDTO == null || id != userEpiDTO.Id)
            {
                _logger.LogInformation("Error: no existeix l'ID indicada.");
                return BadRequest("Error: no existeix l'ID indicada.");
            }

            var existeixEpi = await _bbdd.EpisodisMedics.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

            if (existeixEpi == null){
                _logger.LogError("No existeix episodi mèdic amb aquest ID.");
                return NotFound("No existeix episodi mèdic amb aquest ID.");
            }
            
            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);

            var pacient = await _bbdd.Pacients.FindAsync(userEpiDTO.PacientId);

            if (pacient == null)
            {
                _logger.LogInformation("Error: no existeix el pacient indicat.");
                return BadRequest("Error: no existeix el pacient indicat.");
            }


            _bbdd.EpisodisMedics.Update(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Modificació complerta amb èxit.");
            return NoContent();

        }

        [HttpPatch("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        
        public async Task <IActionResult> UpdateParcialEpisodisMedics (int id, JsonPatchDocument <EpisodiMedicUpdateDTO> patchDto)
        {
            if (patchDto == null || id <= 0)
            {
                _logger.LogError("Error: no existeix l'episodi amb el ID indicat.");
                return BadRequest("Error: no existeix l'episodi amb el ID indicat.");
            }

            var episodi = await _bbdd.EpisodisMedics.AsNoTracking().FirstOrDefaultAsync(v => v.Id == id);

            if (episodi == null)
            {
                _logger.LogError("Error: no existeix l'episodi amb el ID indicat.");
                return NotFound("Error: no existeix l'episodi amb el ID indicat.");
            }
                      

            EpisodiMedicUpdateDTO episodidto = _mapper.Map<EpisodiMedicUpdateDTO>(episodi);

            patchDto.ApplyTo(episodidto, ModelState);
                 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                        
            EpisodiMedic modelo = _mapper.Map<EpisodiMedic>(episodidto);

            _bbdd.Update(modelo);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Episodi mèdic actualitzat.");
            return NoContent();

        }
    }
}
