using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalXD.Models
{
    public class Consulta
    {
        public int Id { get; set; }

        public bool Urgencia { get; set; }

        public string Dolencia { get; set; }

        public string Recepta { get; set; }

        public int PacientId { get; set; }
        public Pacient Pacient { get; set; }

        public int IdMetge { get; set; }
        public Metge Metge { get; set; }

        public int IdEpisodiMedic { get; set; }
        public EpisodiMedic EpisodiMedic { get; set; }

    }
}
