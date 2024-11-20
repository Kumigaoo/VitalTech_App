
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HospitalAPI.Models;
using System.Text;
using System.Text.Json;

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
            var redirectUrl = "https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/auth" +
                               "?client_id=hospital-api" +
                               "&response_type=token" +
                               "&scope=openid profile" +
                               "&redirect_uri=http://localhost:5296/api/Auth/callback";
            return Redirect(redirectUrl);
        }

        [HttpGet("callback")]
        public IActionResult Callback(string access_token)
        {
            if (string.IsNullOrEmpty(access_token))
            {
                return BadRequest("El token de acceso no está presente.");
            }

            // Almacenar el token de acceso en la sesión o en local storage
            HttpContext.Session.SetString("AccessToken", access_token);

            // Redirigir al frontend con el token de acceso
            return Redirect($"http://localhost:4201/inicio?token={access_token}");
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

