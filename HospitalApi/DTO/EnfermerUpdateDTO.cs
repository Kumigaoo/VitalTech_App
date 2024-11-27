using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class EnfermerUpdateDTO
    {
        
        [DNIrestriction]
        public string DNI { get; set; } = string.Empty;
        [Required]
        public string Nom { get; set; } = string.Empty;
        [TELEFONrestriction]
        public int Telefon { get; set; }

        //[ESPECIALITATrestriction("Enfermero")]
        public string Especialitat { get; set; } = string.Empty;

        public string UsuariId { get; set; } = string.Empty;


    }
}
