using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class EpisodiMedic
    {
        [Key]
        public int Id {get; set;}

        public DateTime Data {get; set;}

        [ForeignKey("PacientId")]
        public int PacientId {get; set;}
        public Pacient Pacient {get; set;}

        public ICollection<Personal> Consultes {get; set;}

        public ICollection<Ingres> Ingressos {get; set;}

    }
}
