using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class PlantaDTO
    {
        public int Id { get; set; }

        public int CapacitatHabitacions { get; set; }

        public ICollection<HabitacioReadDTO>? Habitacions { get; set; }

    }
}
