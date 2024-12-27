using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace HospitalApi.DTO
{
    public class PlantaCreateDTO
    {
        [RegularExpression("^[0-9]+$", ErrorMessage = "El camp te que contenedre un unic valor numeric.")]
        public int Piso {  get; set; }


        [RegularExpression("^[0-9]+$", ErrorMessage = "El camp te que contenedre un unic valor numeric.")]
        public int CapacitatHabitacions { get; set; }
    }
}
