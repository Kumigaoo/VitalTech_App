using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Administratiu : Rol
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DNI { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public string Correu { get; set; } = string.Empty;

    }
}
