
using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [Authorize]
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
            IEnumerable<EpisodiMedic> eList = await _bbdd.EpisodisMedics.Include("Pacient").Include("PruebasDiagnosticas").Include("Ingressos").ToListAsync();
            IEnumerable<EpisodiMedicReadDTO> episodis = _mapper.Map<IEnumerable<EpisodiMedicReadDTO>>(eList);

            for (int i = 0; i < episodis.Count(); i++)
            {
                var dni = await (from p in _bbdd.Pacients where p.Id == eList.ElementAt(i).PacientId select p.DNI).FirstOrDefaultAsync();
                if (dni == null) { continue; }
                episodis.ElementAt(i).DNIPacient = dni;

                var dniMetge = await (from m in _bbdd.Metges where m.Id == eList.ElementAt(i).MetgeId select m.DNI).FirstOrDefaultAsync();
                if (dniMetge == null) { continue; }
                episodis.ElementAt(i).DNIMetge = dniMetge;

                var pruebas = episodis.ElementAt(i).PruebasDiagnosticas;
                var ingresos = episodis.ElementAt(i).Ingressos;

                if (pruebas == null || ingresos == null) continue;

                foreach (var prueba in pruebas)
                {
                    var pruebasDiagnosticasOriginal = eList.First(e => e.Id == episodis.ElementAt(i).Id).PruebasDiagnosticas.First(c => c.Id == prueba.Id);
                    if (pruebasDiagnosticasOriginal.MetgeId != 0)
                    {
                        var dniMetgeProba = await (from m in _bbdd.Metges where m.Id == pruebasDiagnosticasOriginal.MetgeId select m.DNI).FirstOrDefaultAsync();
                        if (dniMetgeProba != null) prueba.DNIMetge = dniMetgeProba;
                    }
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

            var episodi = await _bbdd.EpisodisMedics.Include("Pacient").Include("PruebasDiagnosticas").Include("Ingressos").FirstOrDefaultAsync(u => u.Id == id);
            if (episodi == null) return BadRequest("Error, no existeix el episodi indicat");

            var episodiDTO = _mapper.Map<EpisodiMedicReadDTO>(episodi);

            var dni = await (from p in _bbdd.Pacients where p.Id == episodi.PacientId select p.DNI).FirstOrDefaultAsync();
            if (dni == null) return BadRequest("Error, no existeix pacient en el episodi");
            episodiDTO.DNIPacient = dni;

            var dniMetge = await (from m in _bbdd.Metges where m.Id == episodi.MetgeId select m.DNI).FirstOrDefaultAsync();
            if (dniMetge == null) return BadRequest("Error, no existeix metge en el episodi indicat");
            episodiDTO.DNIMetge = dniMetge;

            var pruebas = episodiDTO.PruebasDiagnosticas;
            var ingresos = episodiDTO.Ingressos;

            foreach (var prueba in pruebas)
            {
                var pruebaDiagnosticasOriginal = await (from p in _bbdd.PruebasDiagnosticas where p.Id == prueba.Id select p).FirstOrDefaultAsync();
                if (pruebaDiagnosticasOriginal != null && pruebaDiagnosticasOriginal.MetgeId != 0)
                {
                    var dniMetgeProba = await (from m in _bbdd.Metges where m.Id == pruebaDiagnosticasOriginal.MetgeId select m.DNI).FirstOrDefaultAsync();
                    if (dniMetgeProba != null) prueba.DNIMetge = dniMetgeProba;
                }
                if (pruebaDiagnosticasOriginal != null && pruebaDiagnosticasOriginal.EnfermerId != 0)
                {
                    var dniEnfermerProba = await (from m in _bbdd.Enfermer where m.Id == pruebaDiagnosticasOriginal.EnfermerId select m.DNI).FirstOrDefaultAsync();
                    if (dniEnfermerProba != null) prueba.DNIEnfermer = dniEnfermerProba;
                }
            }

            foreach (var ingres in ingresos)
            {
                var ingresOriginal = await (from i in _bbdd.Ingressos where i.Id == ingres.Id select i).FirstOrDefaultAsync();
                var codiLlit = await (from p in _bbdd.Llits where p.Id == ingresOriginal.LlitId select p.CodiLlit).FirstOrDefaultAsync();
                if (codiLlit != null) ingres.CodiLlit = codiLlit;
            }

            return Ok(episodiDTO);

        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EpisodiMedicCreateDTO>> PostEpisodiMedic([FromBody] EpisodiMedicCreateDTO userEpiDTO)
        {
            if (!ModelState.IsValid){

             return BadRequest(ModelState);

            }


            var pacient = await (from p in _bbdd.Pacients where p.DNI == userEpiDTO.DNIPacient select p).FirstOrDefaultAsync();
            var metge = await (from m in _bbdd.Metges where m.DNI == userEpiDTO.DNIMetge select m).FirstOrDefaultAsync();

            if (pacient == null)
            {
                _logger.LogError("Error: el DNI del pacient proporcionat no existeix.");
                return BadRequest("Error: el DNI del pacient proporcionat no existeix.");
            }

            if (metge == null)
            {
                _logger.LogError("Error: el DNI del metge proporcionat no existeix.");
                return BadRequest("Error: el DNI del metge proporcionat no existeix.");
            }

            pacient.Estado = "baja";
            _bbdd.Update(pacient);


            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);
            episodi.PacientId = pacient.Id;
            episodi.Pacient = pacient;
            episodi.MetgeId = metge.Id;
            episodi.Metge = metge;
            episodi.Estat="No Resuelto";
            episodi.DataTancament= null;
            episodi.Recepta = null;

            episodi.DataObertura = DateTime.Now;

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

            var pacient = await _bbdd.Pacients.FirstOrDefaultAsync(p => p.Id == epi.PacientId);

            if (pacient != null)
            {
                pacient.Estado = "alta";
                _bbdd.Update(pacient);
            }
                    

            var ingr = await _bbdd.Ingressos.FirstOrDefaultAsync(h => h.EpisodiMedicId == id);

            if (ingr != null)
            {
                _logger.LogError("Error: no es pot esborrar un episodi mèdic que conté ingressos.");
                return BadRequest("Error: no es pot esborrar un episodi mèdic que conté ingressos.");
            }


            var probes = await _bbdd.PruebasDiagnosticas.FirstOrDefaultAsync(h => h.EpisodiMedicId == id);

            if (probes != null)
            {
                _logger.LogError("Error: no es pot esborrar un episodi mèdic que conté probes.");
                return BadRequest("Error: no es pot esborrar un episodi mèdic que conté probes.");
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

            if (existeixEpi == null)
            {
                _logger.LogError("No existeix episodi mèdic amb aquest ID.");
                return NotFound("No existeix episodi mèdic amb aquest ID.");
            }
            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);
            var pacient = await (from p in _bbdd.Pacients where p.DNI == userEpiDTO.DNIPacient select p).FirstOrDefaultAsync();
            var metge = await (from m in _bbdd.Metges where m.DNI == userEpiDTO.DNIMetge select m).FirstOrDefaultAsync();

            if (pacient == null)
            {
                _logger.LogInformation("Error: no existeix el pacient indicat.");
                return BadRequest("Error: no existeix el pacient indicat.");
            }

            if (metge == null)
            {
                _logger.LogInformation("Error: no existeix el metge indicat.");
                return BadRequest("Error: no existeix el metge indicat.");
            }

            if (episodi.DataTancament == null) {
                episodi.Estat = "No Resuelto";
            }

            if (episodi.DataTancament != null){
                episodi.Estat = "Resuelto";
                pacient.Estado = "alta";
                _bbdd.Update(pacient);
            }

            episodi.PacientId = pacient.Id;
            episodi.MetgeId = metge.Id;

            _bbdd.EpisodisMedics.Update(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Modificació complerta amb èxit.");
            return NoContent();

        }

    }
}


