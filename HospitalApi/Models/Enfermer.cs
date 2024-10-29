using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Enfermer : Rol
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DNI { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

    }
}
