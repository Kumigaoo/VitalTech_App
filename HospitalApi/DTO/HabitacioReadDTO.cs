
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class HabitacioReadDTO
    {
        public int CodiHabitacio { get; set; }
        public int CapacitatLlits { get; set; }
        [NotMapped]
        public int PlantaId { get; set; }
        public ICollection<LlitReferenceDTO>? Llits { get; set; }
    }
}
