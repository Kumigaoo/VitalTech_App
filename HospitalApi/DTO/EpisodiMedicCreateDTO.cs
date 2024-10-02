using HospitalAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class EpisodiMedicCreateDTO
    {

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        [NotMapped]
        public string DNIPacient { get; set; } = string.Empty;

        public string Dolencia { get; set; } = string.Empty;

        public String Estat { get; set; } = String.Empty;

    }
}
