using HospitalAPI.Models;

namespace HospitalApi.DTO

{
    public class MetgeReadDTO

    {
        public string DNI { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;
        
        public string Telefon { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public int UsuariId { get; set; }

        public ICollection<EpisodiMedic>? EpisodiMedics { get; set; }

        public ICollection<PruebaDiagnosticaReferenceDTO>? PruebasDiagnosticas { get; set; }
    }
}
