using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class PruebaDiagnosticaCreateDTO
    {
        [Required]
        public int MetgeId { get; set; }
        [Required]
        public int EnfermerId { get; set; }
        [Required]
        public int EpisodiMedicId { get; set; }
        [Required]
        public string? Dolencia { get; set; }
    }
}
