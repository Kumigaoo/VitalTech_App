using HospitalAPI.Models;


namespace HospitalAPI.DTO
{
    public class EpisodiMedicDTO
    {

        public int Id { get; set; }

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string Dolencia { get; set; }

        public int PacientId { get; set; }

        public ICollection<IngresDTO> Ingressos { get; set; }

    }
}
