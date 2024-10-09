using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class HabitacioCreateDTO
    {

        public int CodiHabitacio { get; set; }

        public int CapacitatLlits { get; set; }

        [NotMapped]
         public int PlantaId { get; set; }

    }
}
