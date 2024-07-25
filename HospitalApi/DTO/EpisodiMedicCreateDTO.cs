using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class EpisodiMedicCreateDTO
    {

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string PacientId { get; set; }

        public string Dolencia { get; set; }

    }
}
