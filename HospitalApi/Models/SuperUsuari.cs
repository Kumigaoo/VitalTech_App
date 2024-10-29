using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class SuperUsuari : Rol
    {

        [Required]
        public string Nom { get; set; } = string.Empty;

    }
}
