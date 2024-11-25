using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class HabitacioCreateDTO
    {

        [Required]
        public int CodiHabitacio { get; set; }
        [Required]
        public int CapacitatLlits { get; set; }

        [NotMapped]
        public int PlantaId { get; set; }

    }
}
