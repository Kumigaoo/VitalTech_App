using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace HospitalApi.DTO
{
    public class RolCreateDTO
    {
        [Required]
        public string Nom { get; set; }
        [Required]
        public string Descripcio { get; set; }
    }
}
