namespace HospitalXD.Models
{
    public class Consulta
    {

        public int Id { get; set; }

        public bool Urgencia { get; set; }

        public string Dolencia { get; set; }

        public string Recepta { get; set; }

        public Pacient Pacient { get; set; }
       
        public Metge Metge { get; set; }

        public EpisodiMedic EpisodiMedic { get; set; }

    }
}
