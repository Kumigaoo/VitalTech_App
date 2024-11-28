using System.ComponentModel.DataAnnotations;
using HospitalApi.DTO;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class EnfermerReadDTO
    {
        [Required]
        public string DNI { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Telefon { get; set; } = string.Empty;
        public string Especialitat { get; set; } = string.Empty;
        public string UsuariId { get; set; } = string.Empty;
        public ICollection<PruebaDiagnosticaReferenceDTO>? PruebasDiagnosticas { get; set; }
    }
}
