
using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class HabitacioReadDTO
    {
        public int CodiHabitacio { get; set; }
        public int CapacitatLlits { get; set; }
        public int PlantaId { get; set; }
        public ICollection<LlitReferenceDTO>? Llits { get; set; }
    }
}
