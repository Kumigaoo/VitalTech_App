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
        public int Telefon { get; set; }
        public string Especialitat { get; set; } = string.Empty;
        public string UsuariId { get; set; } = string.Empty;
        public ICollection<PruebaDiagnosticaReferenceDTO>? PruebasDiagnosticas { get; set; }

    }
}
