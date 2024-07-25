using HospitalAPI.Models;


namespace HospitalAPI.DTO
{
    public class EpisodiMedicDTO
    {

        public int Id { get; set; }

        public DateTime Data { get; set; }

        public int PacientId { get; set; }

        public ICollection<ConsultaDTO> Consultes { get; set; }

        public ICollection<IngresDTO> Ingressos { get; set; }

    }
}
