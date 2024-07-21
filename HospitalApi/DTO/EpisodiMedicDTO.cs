using HospitalAPI.Models;


namespace HospitalAPI.DTO
{
    public class EpisodiMedicDTO
    {

        public int Id { get; set; }

        public DateTime Data { get; set; }
       
        public int PacientId { get; set; }

        public ICollection<Consulta> Consultes { get; set; }

        public ICollection<Ingres> Ingressos { get; set; }

    }
}
