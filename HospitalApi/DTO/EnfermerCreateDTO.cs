using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class EnfermerCreateDTO
    {
        
        [DNIrestriction]
        public string DNI { get; set; } = string.Empty;
        [Required]
        public string Nom { get; set; } = string.Empty;
        [TELEFONrestriction]
        public string Telefon { get; set; } = string.Empty;
        //[EnfermerEspecRestrict]
        public string Especialitat { get; set; } = string.Empty;
        public string UsuariId { get; set; } = string.Empty;

    }
}
