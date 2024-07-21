using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class Llit
    {

        [Key]
        public int Id { get; set; }

        public bool Ocupat { get; set; }
        
        public bool ForaDeServei { get; set; }

        [ForeignKey("HabitacioId")]
        public int HabitacioId { get; set; }
        public Habitacio Habitacio { get; set; }

        public ICollection<Ingres> Ingressos { get; set; }

    }
}
