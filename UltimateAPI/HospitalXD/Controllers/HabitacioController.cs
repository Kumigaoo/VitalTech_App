using AutoMapper;
using HospitalXD.Data;
using HospitalXD.DTO;
using HospitalXD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

/*
Primer de tot aquesta clase es un Controlador, per tant se'n encarrega de definir els verbs HTTP 
i ejecutar la logica corresponent.
 */

namespace HospitalXD.Controllers
{
    // Cada controlador esta associat a una ruta url unica.
    [Route("api/[controller]")]

    // Metadata que indica al FrameWork que es una controlador
    // Aixo ens dona ventatges perque el mateix framework ens recomana els noms, valida els models... */
    [ApiController]
    
    public class HabitacioController : ControllerBase
    {
        // Creamos la variable logger
        private readonly ILogger<HabitacioController> _logger;

        private readonly ApplicationDbContext _bbdd;

        private readonly IMapper _mapper;

        // classe que hem definit perque la resposta sigui sempre del mateix tipus
        protected APIResponse _response;

        // La inyectamos al constructor del controlador
        public HabitacioController(ILogger<HabitacioController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
            _response = new();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<APIResponse>> GetHabitacions()
        {

            try
            {
                // Registrem al logger que el usuari esta obtenint les habitacions
                _logger.LogInformation("Obtenint les habitacions");

                // Rebem en forma de llista el que te la bbdd a la taula habitacions
                IEnumerable<Habitacio> habList = await _bbdd.Habitacions.ToListAsync();

                _response.EndpointResult = _mapper.Map<IEnumerable<HabitacioDTO>>(habList);
                _response.StatusCode = HttpStatusCode.OK;

                return Ok(_response);

            }
            catch (Exception e)
            {
                _response.IsCorrect = false;
                _response.MessageError = new List<string>() { e.ToString() };
            }

            return _response;

        }

        // Afegim a la ruta un /id per diferencia del get all
        [HttpGet("id", Name = "GetHab")]
        // Documentem que aquest endpoint pot donar aquest codis de estat
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HabitacioDTO>> GetHabitacio(int id)
        {

            if (id == 0)
            {
                // Avisem al logger que la hab no exsisteix
                _logger.LogError("Error, no existeix la hab amb el id " + id);
                return BadRequest();
            }
            
            // el metode FirstOrDefault ens retorna el primer element que troba amb el que nosaltres li diem
            // la lambda de dins el que diu es, per cada h de la llista mira si el id es igual al del parametre 
            var hab = await _bbdd.Habitacions.FirstOrDefaultAsync(h => h.Id == id);

            if (hab == null) return NotFound();

            return Ok(_mapper.Map<HabitacioDTO>(hab));

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        // el FromBody es per indicar a asp.net que el parametre que rebra aquest metode
        // ve de la peticio http
        public async Task<ActionResult<HabitacioDTO>> PostHabitacio([FromBody] HabitacioAddDbDTO userHabDTO)
        {
            // ModelState ja sap que Habitacio
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //Validacio per que no hi hagi cap registre repetit (No cal perqué el DTO de creació no té Id XD)
            // if( await _bbdd.Habitacions.FirstOrDefaultAsync(h => h.Id == hab.Id) != null)
            // {
            // ModelState.AddModelError("Id Repetit","Id repetit");
            //return BadRequest(ModelState);
            //}

            if (userHabDTO == null) return BadRequest(userHabDTO);

            // Li diem al mapper que mappegi el dto amb el seu model
            Habitacio habitacio = _mapper.Map<Habitacio>(userHabDTO);

            await _bbdd.Habitacions.AddAsync(habitacio);
            await _bbdd.SaveChangesAsync();

            // el que fem es que si tot ha anat be, cridem a la ruta get id, per mostra el objecte creat
            return CreatedAtRoute("GetHab", _mapper.Map<HabitacioDTO>(habitacio));

        }

        // Definim el métode delete
        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteHabitacio(int id)
        {
            if(id==0) return BadRequest(ModelState);

            var hab = await _bbdd.Habitacions.FirstOrDefaultAsync(h => h.Id == id);

            if (hab == null) return NotFound();

            // El remove al ser un metode sincron no te la variant asincrona
            _bbdd.Habitacions.Remove(hab);
            await _bbdd.SaveChangesAsync();

            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateHabitacio(int id, [FromBody] HabitacioUpdateDbDTO userHabDTO)
        { 
            
            if(userHabDTO == null || id != userHabDTO.Id) return BadRequest();

            Habitacio habitacio = _mapper.Map<Habitacio>(userHabDTO);

            _bbdd.Habitacions.Update(habitacio);
            await _bbdd.SaveChangesAsync();

            return NoContent();


        }

        

    }
}
