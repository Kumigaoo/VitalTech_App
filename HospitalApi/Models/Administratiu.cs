using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Administratiu : Rol
    {

        [Required]
        public string DNI { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public string Correu { get; set; } = string.Empty;

    }
}
