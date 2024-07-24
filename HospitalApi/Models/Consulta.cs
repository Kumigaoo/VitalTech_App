using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
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


        [ForeignKey("PersonalId")]
        public int PersonalId { get; set; }
        public Personal Personal { get; set; }


        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId { get; set; }
        public EpisodiMedic EpisodiMedic { get; set; }

<<<<<<< HEAD
       
=======
        
>>>>>>> 3dd8c90c7c578fe3569ea16e1b417f4d952e4544
    }
}
