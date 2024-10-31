using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class AdministradorSistema : Personal
    {
        
        [Required]
        public string Hobby { get; set; } = string.Empty;

    }
}
