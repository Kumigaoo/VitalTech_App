using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class PlantaReadDTO
    {
        public int Piso { get; set; }

        public int CapacitatHabitacions { get; set; }

        public ICollection<HabitacionReferenceDTO>? Habitacions { get; set; }

    }
}
