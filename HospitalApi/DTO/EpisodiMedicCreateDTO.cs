using HospitalAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class EpisodiMedicCreateDTO
    {

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string Motivo { get; set; } = string.Empty;

        public string Urgencia {get; set;} = string.Empty;

        public string Recepta { get; set; } = string.Empty;

        public string Estat { get; set; } = string.Empty;


        [NotMapped]
        public string DNIPacient { get; set; } = string.Empty;

        [NotMapped]
        public string DNIMetge { get; set; } = string.Empty;

    }
}
