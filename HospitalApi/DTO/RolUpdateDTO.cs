using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class RolUpdateDTO
    {
        [Required]
        public string Nom {get; set;}
        [Required]
        public string Descripcio {get; set;}
    }
}
