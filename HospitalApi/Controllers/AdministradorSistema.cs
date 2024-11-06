using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
//using EntityFrameworkCore.MySQL.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorSistemaController: ControllerBase
    {
        private readonly ILogger<AdministradorSistemaController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;
        public AdministradorSistemaController(ILogger<AdministradorSistemaController> logger,ApplicationDbContext bbdd,IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<AdministradorSistemaReadDTO>>> GetAdministradorsSistema()
        {
            _logger.LogInformation("Obtenint els Administradors de Sistema");
            IEnumerable<AdministradorSistema> administradorsList = await _bbdd.AdministradorSistema.ToListAsync();

            return Ok(_mapper.Map<IEnumerable<AdministradorSistemaReadDTO>>(administradorsList));
        }

        [HttpGet("{id}", Name = "GetAdministradorSistema")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AdministradorSistemaReadDTO>> GetAdministradorSistema(string id)
        {
            var administradorSistema = await _bbdd.AdministradorSistema.FirstOrDefaultAsync(e => e.DNI == id);
            if(administradorSistema==null)
            {
                _logger.LogError("No existeix un Administrador del Sistema amb aquest DNI");
                return NotFound("No existeix un Administrador del Sistema amb aquest DNI");
            }


            return Ok(_mapper.Map<AdministradorSistemaReadDTO>(administradorSistema));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AdministradorSistemaCreateDTO>> PostAdministradorSistema([FromBody] AdministradorSistemaCreateDTO nouAministradorSistema)
        {
            AdministradorSistema administradorSistema = _mapper.Map<AdministradorSistema>(nouAministradorSistema);

            if(!ModelState.IsValid)
            {
                _logger.LogError("Els camps no son valids");
                return BadRequest("Els camps no son valids");
            }
            
            var adminDuplicado = await _bbdd.AdministradorSistema.FirstOrDefaultAsync(p => p.DNI == administradorSistema.DNI);
            if(adminDuplicado!=null)
            {
                _logger.LogError("Ja existeix un Administrador de sistema amb aquest DNI");
                return BadRequest("Ja existeix un Administrador de sistema amb aquest DNI");
            }
            
            var usuari = await _bbdd.Usuari.FirstOrDefaultAsync(p => p.Id == nouAministradorSistema.UsuariId);
            if(usuari==null)
            {
                _logger.LogError("No existeix un Usuari amb aques ID");
                return BadRequest("No existeix un Usuari amb aques ID");
            }
            if(!usuari.RolId.Equals("Administrador del Sistema"))
            {
                _logger.LogError("Aquest usuari no pot ser Administrador del Sistema");
                return BadRequest("Aquest usuari no pot ser Administrador del Sistema");
            }


            await _bbdd.AddAsync(administradorSistema);
            await _bbdd.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AdministradorSistemaReadDTO>> DeleteAdministrador(string id)
        {
            var adminitradorDelSistema = await _bbdd.AdministradorSistema.FirstOrDefaultAsync(p => p.DNI == id);
            if(adminitradorDelSistema==null)
            {
                _logger.LogError("No existeix un Administrador del Sistema amb aquest DNI");
                return NotFound("No existeix un Administrador del Sistema amb aquest DNI");
            }
            
            _bbdd.AdministradorSistema.Remove(adminitradorDelSistema);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Administrador del sistema eliminat correctament");
            return NoContent();
        }
    }
}