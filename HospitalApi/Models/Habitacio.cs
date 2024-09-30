using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class Habitacio
    {

        

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "El codi de la habitació ha de tenir el num de la planta com a primer digit.")]
        public int CodiHabitacio { get; set; }

        [Required]
        public int CapacitatLlits { get; set; }

        [ForeignKey("PlantaId")]
        public int PlantaId { get; set; }
        public Planta Planta { get; set; }

        public ICollection<Llit> Llits { get; set; }

    }
}
