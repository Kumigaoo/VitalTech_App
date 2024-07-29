using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Personal
    {
        [Key]
        [Required]
        [MinLength(9, ErrorMessage = "El DNI debe tener 9 caracteres.")]
        public string DNI { get; set; }
        public string Especialitat { get; set; }
        public string Nom { get; set; }
        public ICollection<Consulta> Consultes { get; set; }
    }
}
