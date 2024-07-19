namespace HospitalXD.Models
{
    public class EpisodiMedic
    {

        public int Id { get; set; }

        public DateTime Data { get; set; }

        public Pacient Pacient { get; set; }

        public ICollection<Consulta> Consultes { get; set; }

        public ICollection<Ingres> Ingressos { get; set; }

    }
}
