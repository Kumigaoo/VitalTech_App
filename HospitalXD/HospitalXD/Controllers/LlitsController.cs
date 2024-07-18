using HospitlaXD.DTO;
using Microsoft.AspNetCore.Mvc;
using HospitalXD.Data;
using HospitalXD.Controllers;

namespace HospitlaXD.Controllers
{

    [Route("api/[controller]")]
    [Controller]
    public class LlitsController : ControllerBase
    {

        private readonly ILogger<LlitsController> _logger;
        private readonly ApplicationDbContext _bbdd;

        public LlitsController(ILogger<LlitsController> logger, ApplicationDbContext bbdd)
        {

            _logger = logger;
            _bbdd = bbdd;

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Llit>> GetLlits()
        {

            var llits = await _bbdd.Llitsa.ToListAsync();

            return Ok(llits);

        }


        [HttpGet("{id:int}", Name = "LlitId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Llit>> GetLlitsId(int id)
        {

            return await Ok();

        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteLlit(int id)
        {

            return await NoContent();

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PostLlit([FromBody] Llit)
        {

            return await NoContent();

        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Llit>> PutLlit([FromBody] Llit)
        {

            return await Created();

        }

    }
}