using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Metge : Rol
    {

        [Required]
        public string Especialitat { get; set; } = string.Empty;

        public ICollection<PruebasDiagnosticas>? PruebasDiagnosticas { get; set; }

        public ICollection<EpisodiMedic>? EpisodiMedics { get; set; }

    }
}
