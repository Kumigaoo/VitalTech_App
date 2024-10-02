using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Personal
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DNI { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public ICollection<Consulta>? Consultes { get; set; }
    }
}
