using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Metge : Rol
    {

        [Required]
        public string DNI { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public ICollection<PruebasDiagnosticas>? PruebasDiagnosticas { get; set; }
    }
}
