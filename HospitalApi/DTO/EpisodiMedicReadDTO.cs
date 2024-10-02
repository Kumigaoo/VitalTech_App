using HospitalApi.DTO;
using System.ComponentModel.DataAnnotations.Schema;


namespace HospitalApi.DTO
{
    public class EpisodiMedicReadDTO
    {

        public int Id { get; set; }

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string Dolencia { get; set; } = string.Empty;

        public string Estat { get; set; } = string.Empty;

        [NotMapped]
        public string DNIPacient { get; set; } = string.Empty;
       
        public ICollection<ConsultaReferenceDTO>? Consultes { get; set; }

        public ICollection<IngresReadDTO>? Ingressos { get; set; }


    }
}
