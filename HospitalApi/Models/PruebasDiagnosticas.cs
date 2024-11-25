using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class PruebasDiagnosticas
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("MetgeId")]
        public int MetgeId { get; set; }
        public Metge? Metge { get; set; }

        [ForeignKey("EnfermerId")]
        public int EnfermerId { get; set; }
        public Enfermer? Enfermer { get; set; }

        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId { get; set; }
        public EpisodiMedic? EpisodiMedic { get; set; }

        [Required]
        public string? Dolencia { get; set; }

        public string? Pruebas {get; set; }

        public string? Resultados {get; set; }

        public bool? Correcta {get; set; }
    }
}
