using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class Habitacio
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public int Num_llits { get; set; }

        public int Capacitat { get; set; }

        [ForeignKey("PlantaId")]
        public int PlantaId { get; set; }
       

        public Planta Planta { get; set; }

        public ICollection<Llit> Llits { get; set; }

    }
}
