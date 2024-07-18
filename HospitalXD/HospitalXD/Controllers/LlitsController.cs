using HospitlaXD.DTO;
using Microsoft.AspNetCore.Mvc;

namespace HospitlaXD.Controllers
{

    [Route("api/[controller]")]
    [Controller]
    public class LlitsController : ControllerBase
    {

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Llit>> GetLlits()
        {



            return await Ok();

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