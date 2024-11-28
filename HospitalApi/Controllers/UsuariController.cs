
using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsuariController : ControllerBase
    {
        private readonly ILogger<UsuariController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public UsuariController( ILogger<UsuariController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<UsuariReadDTO>>> GetUsuaris()
        {
            _logger.LogInformation("Obtenint els usuaris");
            IEnumerable<Usuari> usuariList = await _bbdd.Usuari.Include("Rol").ToListAsync();
            return Ok(_mapper.Map<IEnumerable<UsuariReadDTO>>(usuariList));
        }

        [HttpGet("{username}", Name = "GetUsuari")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UsuariReadDTO>> GetUsuari(string username)
        {
            if (username.Length <= 0)
            {
                _logger.LogError("Error, no existeix el usuari amb el username indicat.");
                return BadRequest("Error, no existeix el usuari amb el username indicat.");
            }

            var usuari = await _bbdd.Usuari
                .Include("Rol")
                .FirstOrDefaultAsync(u => u.Username == username);

            if (usuari == null) return NotFound();

            return Ok(_mapper.Map<UsuariReadDTO>(usuari));
        }

        

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UsuariCreateDTO>> PostUsuari(
            [FromBody] UsuariCreateDTO formUserDTO
        )
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest("Error: dades introduïdes incorrectes.");
            }

            var rol = await _bbdd.Rol.FirstOrDefaultAsync(p => p.Nom == formUserDTO.RolId);

            if(rol == null){
                return BadRequest("Error: el rol no existe.");
            }

            Usuari usuari = _mapper.Map<Usuari>(formUserDTO);

            await _bbdd.Usuari.AddAsync(usuari);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Usuari creat satisfactòriament.");
            return Ok(formUserDTO);
        }


        [HttpDelete("{username}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUsuari(string username)
        {
            var usuari = await _bbdd.Usuari.FirstOrDefaultAsync(u => u.Username == username);

            if (usuari == null)
            {
                _logger.LogError("Error: no existeix cap usuari amb aquest nom.");
                return NotFound("Error: no existeix cap usuari amb aquest nom.");
            }

            

            _bbdd.Usuari.Remove(usuari);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Usuari esborrat satisfactòriament.");
            return Ok("Usuari eliminat correctament.");
        }

    
        [HttpPut("{username}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUsuari(string username, [FromBody] UsuariCreateDTO userCreateDTO)
        {
            if (userCreateDTO == null || userCreateDTO.Username.Length <= 0)
            {
                _logger.LogError("Error: usuari no trobat o dades introduïdes incorrectes.");
                return BadRequest("Error: usuari no trobat o dades introduïdes incorrectes.");
            }

            var rol = await _bbdd.Rol.FirstOrDefaultAsync(p => p.Nom == userCreateDTO.RolId);

            if(rol == null){
                return BadRequest("Error: el rol no existe.");
            }

            var usuari = await (from u in _bbdd.Usuari where u.Username == username select u).FirstOrDefaultAsync();

            if (usuari == null){
                _logger.LogError("No existeix un usuari amb aquest ID.");
                return NotFound("No existeix un usuari amb aquest ID.");
            }


            _mapper.Map(userCreateDTO, usuari);

            _bbdd.Usuari.Update(usuari);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Usuari modificat exitosament.");
            return NoContent();
        }
        

    }
}
