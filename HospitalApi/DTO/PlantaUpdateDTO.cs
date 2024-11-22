using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class PlantaUpdateDTO
    {
        [RegularExpression("$[0-9]*^", ErrorMessage = "El camp te que contenedre un unic valor numeric.")]
        public int Piso {  get; set; }

        [RegularExpression("$[0-9]*^", ErrorMessage = "El camp te que contenedre un unic valor numeric.")]
        public int CapacitatHabitacions { get; set; }
    }
}
