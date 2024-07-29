using HospitalAPI.Models;


namespace HospitalAPI.DTO
{
    public class EpisodiMedicDTO
    {

        public int Id { get; set; }

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string Dolencia { get; set; }

        public string Estat { get; set; }

        public string PacientId { get; set; }

        public ICollection<IngresDTO> Ingressos { get; set; }

        public ICollection<ConsultaDTO> Consultes { get; set; }

    }
}
