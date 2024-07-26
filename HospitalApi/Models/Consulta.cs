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
        public string Sintomatologia { get; set; }

        public string? Recepta { get; set; }

        [ForeignKey("PersonalId")]
        public string PersonalId { get; set; }
        public Personal Personal { get; set; }

        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId { get; set; }
        public EpisodiMedic EpisodiMedic { get; set; }
    }
}
