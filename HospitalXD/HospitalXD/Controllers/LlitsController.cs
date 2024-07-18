using Microsoft.AspNetCore.Mvc;

namespace HospitlaXD.Controllers
{

    [Route("api/[controller]")]
    [Controller]
    public class LlitsController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<LlitDTO>> GetLlits()
        {


        }


        [HttpGet("{id:int}", Name = "LlitId")]
        public async Task<ActionResult<LlitDTO>> GetLlitsId()
        {

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLlit()
        {

        }

        [HttpPost]
        public async Task<IActionResult> PostLlit()
        {

        }

        [HttpPut]

        public async Task<ActionResult<LlitDTO>> PutLlit()
        {

        }

    }
}