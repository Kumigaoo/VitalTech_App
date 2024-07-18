using HospitalXD.Data;
using HospitalXD.DTO;
using HospitalXD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

/*
Primer de tot aquesta clase es un Controlador, per tant 
se'n encarrega de definir els verbs HTTP i ejecutar
la logica corresponent.
 */

namespace HospitalXD.Controllers
{
    /* Cada verb esta associat a una ruta url .
     Per aixo necessitem el atribut Route que es una metadata
     Que explica que la ruta d'aquest controlador es aquesta */

    [Route("api/[controller]")]

    /* Metadata que indica al FrameWork que es una controlador
     Aixo ens dona ventatges perque el mateix framework ens recomana els noms, valida els models... */

    [ApiController]
    /* ControllerBase es una clase base que conte metodes per manipular peticions http dins de la API.

       Metodes utils de la classe ControllerBase:
     
        - HttpContext :  Propiedad que proporciona acceso al contexto de la solicitud HTTP actual, 
    incluyendo la solicitud, respuesta y otros detalles del entorno de ejecución.

        - Metodos para definir los verbos HTTP.

        - Acciones Comunes: Ok(), NotFound(), BadRequest()...
    
         Son métodos que devuelven resultados típicos de las acciones de un controlador. 
        
        Por ejemplo: 
        Ok() devuelve una respuesta HTTP 200 OK. 
        NotFound() devuelve una respuesta HTTP 404 Not Found, etc.

     */
    public class HabitacioController : ControllerBase
    {
        // Creamos la variable logger
        private readonly ILogger<HabitacioController> _logger;

        private readonly ApplicationDbContext _bbdd;

        // La inyectamos al constructor del controlador
        public HabitacioController(ILogger<HabitacioController> logger, ApplicationDbContext bbdd)
        {
            _logger = logger;
            _bbdd = bbdd;
        }

        [HttpGet]
        /* Els codis de estat s'han de trobar en tots els notres endpoitns
         Per aixo necessitem que el tipus de retorn sigui un ActionResult<T>
         Per resumir ActionResult es una clase que el que fa es rebre un objecte de tipus el que sigui
         El encapsula i el junta amb la respota http */

        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HabitacioDTO>>> GetHabitacions()
        {
            _logger.LogInformation("Obtenir les Habs");
            return Ok(await _bbdd.Habitacions.ToListAsync());
            
        }

        // Afegim a la ruta un /id per diferencia del get all
        [HttpGet("id", Name = "GetHabXD")]
        // Documentem que aquest endpoint pot donar aquest codis de estat
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<HabitacioDTO> GetHabitacio(int id)
        {

            if (id == 0)
            {
                // Avisem amb el login que la hab no exsisteix
                _logger.LogError("Error, no existeix la hab amb el id " + id);
                return BadRequest();
            }
            

            // el metode FirstOrDefault ens retorna el primer element que troba amb el que nosaltres li diem
            // la lambda de dins el que diu es, per cada h de la llista mira si el id es igual al del parametre 
            var hab = _bbdd.Habitacions.FirstOrDefault(h => h.Id == id);

            if (hab == null) return NotFound("No existe ninguna habitación con el id selecionado");

            return Ok(hab);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        // el FromBody es per indicar a asp.net que el parametre que rebra aquest metode
        // ve de la peticio http
        public ActionResult<HabitacioDTO> PostHabitacio([FromBody] HabitacioAddDbDTO hab)
        {
            // ModelState ja sap que Habitacio
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Validacio per que no hi hagi cap registre repetit (No cal perqué el DTO de creació no té Id XD)
            // if( _bbdd.Habitacions.FirstOrDefault(h => h.Id == hab.Id) != null)
            // {
            //  ModelState.AddModelError("Id Repetit","Id repetit");
            // return BadRequest(ModelState);
            // }

            if (hab == null) return BadRequest(hab);

            // asignem el nou id a la nova hab i l'afegim al storage

            Habitacio habitacio = new()
            {
                // No cal que posem el id perque com hem dit abans el genera la bbdd
                Capacitat = hab.Capacitat
            };

            _bbdd.Habitacions.Add(habitacio);
            _bbdd.SaveChanges();

            // el que fem es que si tot ha anat be, cridem a la ruta get id, per mostra el objecte creat
            return CreatedAtRoute("GetHabXD", new {id = habitacio.Id}, habitacio);

        }

        // Definim el métode delete
        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteHabitacio(int id)
        {
            if(id==0) return BadRequest(ModelState);

            var hab = _bbdd.Habitacions.FirstOrDefault(h => h.Id == id);

            if (hab == null) return NotFound("No existe ninguna habitación con el id selecionado");

            _bbdd.Habitacions.Remove(hab);
            _bbdd.SaveChanges();

            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult UpdateHabitacio(int id, [FromBody] HabitacioUpdateDbDTO hab)
        { 
            
            if(hab == null || id != hab.Id) return BadRequest("El id no está relacionado correctamente con la habitación");

            Habitacio habitacio = new()
            {
                Id = hab.Id,
                Capacitat = hab.Capacitat
            };

            _bbdd.Habitacions.Update(habitacio);
            _bbdd.SaveChanges();

            return NoContent();


        }

        private bool HabitacionExists (long id) {
            return _bbdd.Habitacions.Any(e => e.Id == id);
        }

        

    }
}
