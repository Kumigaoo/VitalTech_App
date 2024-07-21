using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalXD.Models
{
    public class Consulta
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public bool Urgencia { get; set; }

        [Required]
        public string Dolencia { get; set; }

        public string Recepta { get; set; }

        [ForeignKey("PacientId")]
        public int PacientId { get; set; }
        public Pacient Pacient { get; set; }

        [ForeignKey("MetgeId")]
        public int MetgeId { get; set; }
        public Metge Metge { get; set; }

        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId { get; set; }
        public EpisodiMedic EpisodiMedic { get; set; }

    }
}
