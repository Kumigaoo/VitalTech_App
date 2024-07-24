using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class PlantaDTO
    {
        public int Id { get; set; }

        public int CapacitatHabitacions { get; set; }

        public ICollection<HabitacioDTO> Habitacions { get; set; }

    }
}
