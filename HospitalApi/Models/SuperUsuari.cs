using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class SuperUsuari : Rol
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nom { get; set; } = string.Empty;

    }
}
