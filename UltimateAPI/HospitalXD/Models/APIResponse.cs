/* Aquesta classe la utiltizarem per definir un estandar que 
 utiltizara la api per respondre al client*/

using System.Net;

namespace HospitalXD.Models
{
    public class APIResponse
    {
        // propietat on guardarem el codi que retorni el meu endpoint
        public HttpStatusCode StatusCode { get; set; }

        public bool IsCorrect { get; set; } = true;

        public List<string> MessageError { get; set; }

        public object EndpointResult { get; set; }
    }
}
