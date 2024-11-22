using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class AdministradorSistema : Personal
    {
        
        [Required]
        public string Prioridad { get; set; } = string.Empty;

    }
}
