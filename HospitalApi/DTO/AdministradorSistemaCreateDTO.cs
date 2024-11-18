using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class AdministradorSistemaCreateDTO
    {
        [DNIrestriction]
        public string DNI {get; set;} = string.Empty;
        [Required]
        public string Nom {get; set;} = string.Empty;
        [TELEFONrestriction]
        public int Telefon {get; set;}
        public string UsuariId { get; set; } = string.Empty;
        [Required]
        public string Hobby { get; set; } = string.Empty;
    }
}