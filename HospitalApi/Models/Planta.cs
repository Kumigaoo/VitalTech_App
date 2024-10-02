using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Planta
    {
        [Key]
        public int Id { get; set; }

        public int CapacitatHabitacions { get; set; }

        public ICollection<Habitacio>? Habitacions { get; set; }
    }
}
