using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class EpisodiMedicCreateDTO
    {

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public int PacientId { get; set; }

        public string Dolencia { get; set; }

    }
}
