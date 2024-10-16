using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    //Pruebas diagnositicas
    public class Consulta
    {
        [Key]
        public int Id { get; set; }

        // Quitar
        [Required]
        public bool? Urgencia { get; set; }

        // Dolencia
        [Required]
        public string? Sintomatologia { get; set; }

        // En EM
        public string? Recepta { get; set; }

        [ForeignKey("PersonalId")]
        public int PersonalId { get; set; }
        public Personal? Personal { get; set; }

        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId { get; set; }
        public EpisodiMedic? EpisodiMedic { get; set; }
    }
}
