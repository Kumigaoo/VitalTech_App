using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Enfermer : Personal
    {
        [Required]
        public string Especialitat { get; set; } = string.Empty;

    }
}
