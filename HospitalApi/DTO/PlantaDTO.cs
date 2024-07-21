using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class PlantaDTO
    {
        public int Id { get; set; }

        public int NumHabs { get; set; }

        public ICollection<HabitacioDTO> Habitacions { get; set; }

    }
}
