
using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.DTO
{
    public class HabitacioDTO
    {

        public int Id { get; set; }

        public int CapacitatLlits { get; set; }

        public int PlantaId { get; set; }

        public ICollection<LlitDTO> Llits { get; set; }
    }
}
