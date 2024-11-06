using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class PruebaDiagnosticaReferenceDTO
    {
        public int Id { get; set; }
        public int MetgeId { get; set; }
        public int EnfermerId { get; set; }
        public int EpisodiMedicId { get; set; }
        public string? Dolencia { get; set; }
    }
}
