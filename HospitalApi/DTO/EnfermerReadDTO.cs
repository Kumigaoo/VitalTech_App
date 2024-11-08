using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class EnfermerReadDTO
    {
        [Required]
        public string DNI { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public int Telefon { get; set; }
        public string EnfermerEspecialitat { get; set; } = string.Empty;
        public ICollection<PruebasDiagnosticas>? PruebasDiagnosticas { get; set; }


    }
}
