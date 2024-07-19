namespace HospitalXD.Models
{
    public class Ingres
    {

        public int Id { get; set; }

        public DateTime DataEntrada { get; set; }

        public DateTime DataSortida { get; set; }

        public EpisodiMedic EpisodiMedic { get; set; }

        public Llit Llit { get; set; }

    }
}
