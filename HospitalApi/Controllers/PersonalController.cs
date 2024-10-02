using AutoMapper;
using HospitalApi.Data;
using HospitalApi.Enums;
using HospitalApi.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{
    [Route(("api/[Controller]"))]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly ILogger<PersonalController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public PersonalController(ILogger<PersonalController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PersonalReadDTO>>> GetPersonals()
        {
            _logger.LogInformation("Obtenint el personal");
            IEnumerable<Personal> perList = await _bbdd.Personals.Include("Consultes").ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PersonalReadDTO>>(perList));
        }

        [HttpGet("{id}", Name = "GetPer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PersonalReadDTO>> GetPersonal(string id)
        {
            if (id.Length < 9)
            {
                _logger.LogError("Format de ID incorrecte.");
                return BadRequest();
            }

            var per = await _bbdd.Personals.Include("Consultes").FirstOrDefaultAsync(h => h.DNI == id);

            if (per == null)
            {
                _logger.LogError("No existeix cap empleat amb l'ID: " + id);
                return NotFound("No existeix cap empleat amb l'ID: " + id);
            }
            return Ok(_mapper.Map<PersonalReadDTO>(per));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PersonalCreateDTO>> PostPersonal(
            [FromBody] PersonalCreateDTO userPerDTO
        )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            
            if (!CheckDNI(userPerDTO.DNI))
            {
                _logger.LogError("Format de DNI incorrecte.");
                return BadRequest("Format de DNI incorrecte.");
            }

            if (!Enum.TryParse(typeof(EnumProfessions), userPerDTO.Especialitat.Replace(" ",""), true, out _))
            {
                _logger.LogError("Professio incorrecte.");
                return BadRequest("Professio incorrecte.");
            }

            Personal personal = _mapper.Map<Personal>(userPerDTO);

            await _bbdd.Personals.AddAsync(personal);
            await _bbdd.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPersonal), new { id = userPerDTO.DNI }, userPerDTO);

        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePersonal(string id)
        {
        
            var personal = await _bbdd.Personals.FirstOrDefaultAsync(h => h.DNI == id);

            if (personal == null)
            {
                _logger.LogError("ID de personal no trobat.");
                return NotFound("ID de personal no trobat.");
            }

            _bbdd.Personals.Remove(personal);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Personal esborrat amb �xit.");
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePer(string id, [FromBody] PersonalCreateDTO userPerDTO)
        {
            if (id == null || !CheckDNI(userPerDTO.DNI)) return BadRequest("DNI invalid");
            if (!Enum.TryParse(typeof(EnumProfessions), userPerDTO.Especialitat.Replace(" ", ""), true, out _)) return BadRequest("Professio incorrecte.");
            

            var pro = await (from p in _bbdd.Personals where p.DNI == id select p).FirstOrDefaultAsync();

            if (pro == null){
                _logger.LogError("No existeix personal amb aquest ID.");
                return NotFound("No existeix personal amb aquest ID.");
            }

            _mapper.Map(userPerDTO, pro);

            _bbdd.Personals.Update(pro);
            await _bbdd.SaveChangesAsync();
            return NoContent();
        }

        public static bool CheckDNI(string dni)
        {

            var lettersArray = "TRWAGMYFPDXBNJZSQVHLCKE".ToCharArray();

            if (dni.Length != 9) return false;

            int dniValue = 0;
            char dniLetter = char.Parse(dni.Substring(8));

            if (int.TryParse(dni.Substring(0, 8), out dniValue))
            {

                Dictionary<int, char> letterToNum = new Dictionary<int, char>(23);

                for (int i = 0; i < 23; i++)
                {
                    letterToNum.Add(i, lettersArray[i]);
                }

                dniValue = dniValue % 23;

                foreach (var item in letterToNum)
                {
                    if (item.Key == dniValue && item.Value == dniLetter) return true;
                }

            }

            return false;

        }

    }
}
