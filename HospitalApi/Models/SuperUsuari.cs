using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class SuperUsuari : Rol
    {
        [Key]
        public int IdSuperUsuari { get; set; }

        [Required]
        public string Nom { get; set; } = string.Empty;

    }
}
