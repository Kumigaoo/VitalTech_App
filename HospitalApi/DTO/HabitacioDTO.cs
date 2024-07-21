
using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.DTO
{
    public class HabitacioDTO
    {

        public int Id { get; set; }

        public int Capacitat { get; set; }

        public int PlantaId { get; set; }

        public ICollection<LlitDTO> Llits { get; set; }
    }
}
