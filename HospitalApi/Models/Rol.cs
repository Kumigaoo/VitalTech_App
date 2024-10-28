using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Rol
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public string nom { get; set; } = string.Empty;

        public string Descripcio { get; set; } = string.Empty;

         public ICollection<User>? Users { get; set; }

    }
}
