using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class PruebasDiagnosticas
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Dolencia { get; set; }

        [ForeignKey("UsuariId")]
        public int UsuariId { get; set; }
        public Usuari? Usuari { get; set; }

        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId { get; set; }
        public EpisodiMedic? EpisodiMedic { get; set; }
    }
}
