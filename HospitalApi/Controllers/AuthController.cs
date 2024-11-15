
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
        [HttpGet("login")]
        public IActionResult Login()
        {
            var redirectUrl = "https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/auth" +
                           "?client_id=hospital-api" +
                           "&response_type=code" +
                           "&scope=openid profile" +
                           "&redirect_uri=http://localhost:5296/api/Auth/callback";
            return Redirect(redirectUrl);
        }

        [HttpGet("callback")]
        public async Task<IActionResult> Callback(string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                return BadRequest("El código de autorización no es válido.");
            }

            var tokenUrl = "https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/token";

            using var httpClient = new HttpClient();
            var parameters = new Dictionary<string, string>
    {
        { "client_id", "hospital-api" },
        { "client_secret", "4w7bVyGfcVEwNkzgFLchC9tWUHaSYybd" },
        { "grant_type", "authorization_code" },
        { "code", code },
        { "redirect_uri", "http://localhost:5296/api/Auth/callback" }
    };

            var response = await httpClient.PostAsync(tokenUrl, new FormUrlEncodedContent(parameters));

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest("Error, no se pudo obtener el token de acceso de Keycloak.");
            }

            var tokenResponse = await response.Content.ReadAsStringAsync();
            var tokenData = JsonSerializer.Deserialize<JsonDocument>(tokenResponse);
            var accessToken = tokenData?.RootElement.GetProperty("access_token").GetString();

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("No se pudo obtener el token.");
            }

            HttpContext.Session.SetString("AccessToken", accessToken);

            return Redirect($"http://localhost:4201/inicio?token={accessToken}");

        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("AccessToken");
            
            var logoutUrl = "https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/logout" +
                            "?client_id=hospital-api" +
                            "&redirect_uri=http://localhost:4201";

            return Redirect(logoutUrl);
        }


    }

}

