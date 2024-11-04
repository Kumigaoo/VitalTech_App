
using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
//using EntityFrameworkCore.MySQL.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<EpisodiMedicReadDTO>>> GetEpisodisMedics()
        {

            _logger.LogInformation("Obtenint els episodis mèdics");
            IEnumerable<EpisodiMedic> eList = await _bbdd.EpisodisMedics.Include("Pacient").Include("Consultes").Include("Ingressos").ToListAsync();
            IEnumerable<EpisodiMedicReadDTO> episodis = _mapper.Map<IEnumerable<EpisodiMedicReadDTO>>(eList);

            for (int i = 0; i < episodis.Count(); i++)
            {
                var dni = await (from p in _bbdd.Pacients where p.Id == eList.ElementAt(i).PacientId select p.DNI).FirstOrDefaultAsync();
                if (dni == null) { continue; }
                episodis.ElementAt(i).DNIPacient = dni;

                var consultas = episodis.ElementAt(i).Consultes;
                var ingresos = episodis.ElementAt(i).Ingressos;

                if(consultas == null || ingresos == null) continue;

                foreach (var consulta in consultas)
                {
                    var consultaOriginal = eList.First(e => e.Id == episodis.ElementAt(i).Id).Consultes.First(c => c.Id == consulta.Id);      
                    var dniPersonal = await (from p in _bbdd.Personals where p.Id == consultaOriginal.PersonalId select p.DNI).FirstOrDefaultAsync();
                    if (dniPersonal != null) consulta.DNIPersonal = dniPersonal;
                } 

                foreach (var ingres in ingresos)
                {
                    var ingresOriginal = eList.First(e => e.Id == episodis.ElementAt(i).Id).Ingressos.First(c => c.Id == ingres.Id);      
                    var codiLlit = await (from p in _bbdd.Llits where p.Id == ingresOriginal.LlitId select p.CodiLlit).FirstOrDefaultAsync();
                    if (codiLlit != null) ingres.CodiLlit = codiLlit;
                } 

            }

            return Ok(episodis);
        }

        [HttpGet("{id:int}", Name = "GetEpi")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EpisodiMedicReadDTO>> GetEpisodi(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Error, format d'ID incorrecte.");
                return BadRequest("Error, format d'ID incorrecte.");
            } 
        
            var e = await _bbdd.EpisodisMedics.Include("Consultes").Include("Ingressos").FirstOrDefaultAsync(h => h.Id == id);

            if (e == null)
            {
                _logger.LogError("Error, no existeix l'episodi amb l'ID " + id + ".");
                return NotFound("Error, no existeix l'episodi amb l'ID indicat.");
            }

            EpisodiMedicReadDTO episodi = _mapper.Map<EpisodiMedicReadDTO>(e);
            var dni = await (from p in _bbdd.Pacients where p.Id == e.PacientId select p.DNI).FirstOrDefaultAsync();
            if (dni == null) return NotFound("No existeix la Persona amb l'ID indicat.");

            episodi.DNIPacient = dni;

            var consultas = episodi.Consultes;
            var ingresos = episodi.Ingressos;

            foreach (var consulta in consultas)
            {
                var consultaOriginal = e.Consultes.FirstOrDefault(c => c.Id == consulta.Id);                
                var dniPersonal = await (from p in _bbdd.Personals where p.Id == consultaOriginal.PersonalId select p.DNI).FirstOrDefaultAsync();
                if (dniPersonal != null) consulta.DNIPersonal = dniPersonal;
            }

            foreach (var ingres in ingresos)
            {
                var ingresOriginal = e.Ingressos.FirstOrDefault(c => c.Id == ingres.Id);    
                var codiLlit = await (from p in _bbdd.Llits where p.Id == ingresOriginal.LlitId select p.CodiLlit).FirstOrDefaultAsync();
                if (codiLlit != null) ingres.CodiLlit = codiLlit;
            } 

            return Ok(episodi);

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

            var pacient = await (from p in _bbdd.Pacients where p.DNI == userEpiDTO.DNIPacient select p).FirstOrDefaultAsync();

            if (pacient == null)
            {
                _logger.LogError("Error: el ID de pacient proporcionat no existeix.");
                return BadRequest("Error: el ID de pacient proporcionat no existeix.");
            }

            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);
            episodi.PacientId = pacient.Id;

            await _bbdd.EpisodisMedics.AddAsync(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Episodi creat exitosament.");

            return CreatedAtAction(nameof(GetEpisodi), new { id = episodi.Id }, userEpiDTO);

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
            var pacient = await (from p in _bbdd.Pacients where p.DNI == userEpiDTO.DNIPacient select p).FirstOrDefaultAsync();

            if (pacient == null)
            {
                _logger.LogInformation("Error: no existeix el pacient indicat.");
                return BadRequest("Error: no existeix el pacient indicat.");
            }

            episodi.PacientId = pacient.Id;

            _bbdd.EpisodisMedics.Update(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Modificació complerta amb èxit.");
            return NoContent();

        }

       
    }
}
