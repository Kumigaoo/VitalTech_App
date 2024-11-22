using AutoMapper;
using HospitalApi.Data;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratiuController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public AdministratiuController(
            ILogger<AdministratiuController> logger,
            ApplicationDbContext bbdd,
            IMapper mapper
        )
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<AdministratiuReadDTO>>> GetAdministradors()
        {
            _logger.LogInformation("Obtenint els administradors");
            IEnumerable<Administratiu> adminList = await _bbdd.Administratius.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<AdministratiuReadDTO>>(adminList));
        }

        [HttpGet("{id}", Name = "GetAdministratiu")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<AdministratiuReadDTO>>> GetAdministratiu(
            string id
        )
        {
            var admin = await _bbdd.Administratius.FirstOrDefaultAsync(a => a.DNI == id);
            if (admin == null)
            {
                _logger.LogError("No existeix un Administratiu amb aquest id");
                return NotFound("No existeix un Administratiu amb aquest id");
            }

            return Ok(_mapper.Map<AdministratiuReadDTO>(admin));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AdministratiuReadDTO>> PostAdministratiu(
            [FromBody] AdministratiuReadDTO nouAdmin
        )
        {
            Administratiu administratiu = _mapper.Map<Administratiu>(nouAdmin);

            if (!ModelState.IsValid)
            {
                _logger.LogError("Els camps no són vàlids");
                return BadRequest("Els camps no són vàlids");
            }

            if (await _bbdd.Administratius.FirstOrDefaultAsync(a => a.DNI == nouAdmin.DNI) != null)
            {
                _logger.LogError("Ja existeix un Administratiu amb aquest DNI");
                return BadRequest("Ja existeix un Administratiu amb aquest DNI");
            }

            var usuari = await _bbdd.Usuari.FirstOrDefaultAsync(p =>
                p.Username == nouAdmin.UsuariId
            );
            if (usuari == null)
            {
                _logger.LogError("No existeix un Usuari amb aques ID");
                return BadRequest("No existeix un Usuari amb aques ID");
            }

            if (!usuari.RolId.Equals("Administratiu"))
            {
                _logger.LogError("Aquest usuari no pot ser Administratiu");
                return BadRequest("Aquest usuari no pot ser Administratiu");
            }

            var usuarioEnUso = await _bbdd.Administratius.FirstOrDefaultAsync(p =>
                p.UsuariId == nouAdmin.UsuariId
            );
            if (usuarioEnUso != null)
            {
                _logger.LogError("Ja existeix un Administratiu amb aquest Usuari ID");
                return BadRequest("Ja existeix un Administratiu amb aquest Usuari ID");
            }

            await _bbdd.Administratius.AddAsync(administratiu);
            await _bbdd.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AdministratiuReadDTO>> DeleteAdministratiu(string id)
        {
            var admin = await _bbdd.Administratius.FirstOrDefaultAsync(p => p.DNI == id);
            if (admin == null)
            {
                _logger.LogError("No existeix un Administratiu amb aquest DNI");
                return NotFound("No existeix un Administratiu amb aquest DNI");
            }

            var usuario = await _bbdd.Usuari.FirstOrDefaultAsync(p => p.Username == admin.UsuariId);
            usuario.RolId = null;

            _bbdd.Administratius.Remove(admin);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Administratiu eliminat correctament");
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateAdministratiu(
            string id,
            [FromBody] AdministratiuUpdateDTO AdministratiuUpdateDTO
        )
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Els camps no son vàlids");
                return BadRequest("Els camps no son vàlids");
            }

            var admin = await _bbdd.Administratius.FirstOrDefaultAsync(p =>
                p.DNI == AdministratiuUpdateDTO.DNI
            );
            if (admin == null)
            {
                _logger.LogError("No existeix un Administratiu amb aquest DNI");
                return NotFound("No existeix un Administratiu amb aquest DNI");
            }

            var usuari = await _bbdd.Usuari.FirstOrDefaultAsync(p =>
                p.Username == AdministratiuUpdateDTO.UsuariId
            );
            if (usuari == null)
            {
                _logger.LogError("No existeix un Usuari amb aques ID");
                return BadRequest("No existeix un Usuari amb aques ID");
            }

            if (!usuari.RolId.Equals("Administratiu"))
            {
                _logger.LogError("Aquest usuari no pot ser Administratiu");
                return BadRequest("Aquest usuari no pot ser Administratiu");
            }

            _mapper.Map(AdministratiuUpdateDTO, admin);
            _bbdd.Administratius.Update(admin);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Administratiu modificat exitosament.");
            return NoContent();
        }
    }
}
