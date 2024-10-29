using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Enfermer : Rol
    {
        [Required]
        public string DNI { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

    }
}
