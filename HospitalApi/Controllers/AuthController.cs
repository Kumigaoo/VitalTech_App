
using Microsoft.AspNetCore.Mvc;
using HospitalApi.Enums;

namespace HospitalAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        // Login endpoint - Authorization Code Flow
        [HttpGet("login")]
        public IActionResult Login()
        {
            if(Enum.IsDefined(typeof(EnumProfessions),"MedicoGeneral")) {}

            var redirectUrl = "https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/auth" +
                               "?client_id=hospital-api" +
                               "&response_type=token" +
                               "&scope=openid%20profile" +
                               "&redirect_uri=http://localhost:4201/inicio";
            return Redirect(redirectUrl);
        }

        [HttpGet("callback")]
        public IActionResult Callback([FromQuery] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("El token de acceso no está presente.");
            }

            HttpContext.Session.SetString("AccessToken", token);

            return Redirect($"http://localhost:4201/inicio?token={token}");
        }

        // Logout endpoint
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            var logoutUrl = "https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/logout" +
                            "?client_id=hospital-api" +
                            "&redirect_uri=http://localhost:4201";

            return Redirect(logoutUrl);
        }



    }

}

