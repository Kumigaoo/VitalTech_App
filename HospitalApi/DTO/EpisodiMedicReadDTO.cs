using HospitalApi.DTO;
using System.ComponentModel.DataAnnotations.Schema;


namespace HospitalApi.DTO
{
    public class EpisodiMedicReadDTO
    {

        public int Id { get; set; }

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string? Motivo { get; set; }

        public string? Urgencia {get; set;}

        public string? Recepta { get; set; }

        public string Estat { get; set; } = string.Empty;


        [NotMapped]
        public string DNIPacient { get; set; } = string.Empty;

        [NotMapped]
        public string DNIMetge { get; set; } = string.Empty;
       
        public ICollection<PruebaDiagnosticaReadDTO>? PruebasDiagnosticas { get; set; }

        public ICollection<IngresReadDTO>? Ingressos { get; set; }


    }
}
