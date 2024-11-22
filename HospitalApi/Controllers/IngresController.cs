using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
//using EntityFrameworkCore.MySQL.Data;
using Humanizer;
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
        public async Task<ActionResult<IEnumerable<IngresReadDTO>>> GetIngressos()
        {

            _logger.LogInformation("Obtenint els ingressos");
            IEnumerable<Ingres> ingresList = await _bbdd.Ingressos.Include("EpisodiMedic").Include("Llit").ToListAsync();

            IEnumerable<IngresReadDTO> ingresos = _mapper.Map<IEnumerable<IngresReadDTO>>(ingresList);

            for (int i = 0; i < ingresos.Count(); i++)
            {
                var codiLlit = await (from p in _bbdd.Llits where p.Id == ingresList.ElementAt(i).LlitId select p.CodiLlit).FirstOrDefaultAsync();
                if (codiLlit == null) { continue; }
                ingresos.ElementAt(i).CodiLlit = codiLlit;
            }

            return Ok(ingresos);

        }


        [HttpGet("{id:int}", Name = "GetIngres")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IngresReadDTO>> GetIngres(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: format d'ID incorrecte.");
                return BadRequest("Error: format d'ID incorrecte.");
            }

            var ing = await _bbdd.Ingressos.FirstOrDefaultAsync(h => h.Id == id);

            if (ing == null)
            {
                _logger.LogInformation("Error: no existeix l'ID indicat.");
                return NotFound("Error: no existeix l'ID indicat.");
            }

            IngresReadDTO ingres = _mapper.Map<IngresReadDTO>(ing);

            var codi = await (from p in _bbdd.Llits where p.Id == ing.LlitId select p.CodiLlit).FirstOrDefaultAsync();
            if (codi == null) return NotFound("No existeix el Llit amb l'ID indicat.");

            ingres.CodiLlit = codi;
            return Ok(ingres);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IngresCreateDTO>> PostIngres([FromBody] IngresCreateDTO userIngresDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest(ModelState);
            }

            var llit = await (from p in _bbdd.Llits where p.CodiLlit == userIngresDTO.CodiLlit select p).FirstOrDefaultAsync();
            var episodi = await _bbdd.EpisodisMedics.FindAsync(userIngresDTO.EpisodiMedicId);

            if (llit == null)
            {
                _logger.LogError("Error: no existeix el llit amb l'ID indicat.");
                return BadRequest("Error: no existeix el llit amb l'ID indicat.");
            }

            if (llit.Ocupat){
                _logger.LogError("La cama no esta disponible");
                return BadRequest("La cama no esta disponible");
            }

            if(llit.ForaDeServei){
                _logger.LogError("La cama esta fora de servei");
                return BadRequest("La cama esta fora de servei");
            }

            if (episodi == null)
            {
                _logger.LogError("Error: no existeix l'episodi mèdic indicat.");
                return BadRequest("Error: no existeix l'episodi mèdic indicat.");
            }

            Ingres ingres = _mapper.Map<Ingres>(userIngresDTO);
            ingres.LlitId = llit.Id;
            ingres.Llit = llit;
            ingres.EpisodiMedicId = episodi.Id;
            
            ingres.DataSortida=null;

            
            llit.Ocupat = true;
            _bbdd.Update(llit);

            await _bbdd.Ingressos.AddAsync(ingres);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIngres), new { id = ingres.Id }, userIngresDTO);

        }

        [HttpDelete("{id:int}")]
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
                return NotFound("Error: ingrés indicat no trobat.");
            }
            var llit = await _bbdd.Llits.FindAsync(ingres.LlitId);
            if (llit == null) return NotFound("No existeix llit amb aquest ID.");

            llit.Ocupat=false;
            llit.Ingressos = null;

            _bbdd.Update(llit);


            _bbdd.Ingressos.Remove(ingres);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Ingrés esborrat exitosament.");
            return NoContent();

        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateIngres(int id, [FromBody] IngresCreateDTO userIngresDTO)
        {
            var ingres = await _bbdd.Ingressos.FirstOrDefaultAsync(h => h.Id == id);
            var codiLlitOrig = ingres.LlitId;

            if (ingres == null)
            {
                _logger.LogError("No existeix ingrés amb aquest ID.");
                return NotFound("No existeix ingrés amb aquest ID.");
            }

            var llit = await (from p in _bbdd.Llits where p.CodiLlit == userIngresDTO.CodiLlit select p).FirstOrDefaultAsync();
            if (llit == null) return NotFound("No existeix llit amb aquest ID.");
            var llitOrig = await (from p in _bbdd.Llits where p.Id == codiLlitOrig select p).FirstOrDefaultAsync();

            if (llit.CodiLlit != llitOrig.CodiLlit){
               llitOrig.Ocupat = false;
               llitOrig.Ingressos = null;
               _bbdd.Update(llitOrig);
            }
            
            var ingresos = llit.Ingressos;
            if(userIngresDTO.DataSortida != null){
                ingres.DataSortida = userIngresDTO.DataSortida.Value;
                llit.Ocupat = false;
                llit.Ingressos  = null;
                _bbdd.Update(llit);
                llit.Ingressos = ingresos;
            } else {
                if(!llit.Ocupat  && !llit.ForaDeServei ){
                    llit.Ocupat = true;
                    _bbdd.Update(llit);
                } else {
                    _logger.LogError("Cama no disponible.");
                    return NotFound("Cama no disponible.");
                }
            }
            

            ingres.LlitId = llit.Id;
            ingres.Llit = llit;

            Ingres ingresoMap = _mapper.Map(userIngresDTO, ingres);

            ingresoMap.LlitId = llit.Id;
            ingresoMap.Llit = llit;

            _bbdd.Ingressos.Update(ingresoMap);
            
            await _bbdd.SaveChangesAsync();
            

            _logger.LogInformation("Modificació efectuada correctament.");
            return NoContent();

        }
 
    }
}
