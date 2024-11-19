using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class HabitacionReferenceDTO
    {
        [Required]
        public int CodiHabitacio { get; set; }
        [Required]
        public int CapacitatLlits { get; set; }

    }
}
