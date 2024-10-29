using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Rol
    {

        [Key]        
        public int IdRol { get; set; }

        [Required]
        public string NomRol { get; set; } = string.Empty;

        public string Descripcio { get; set; } = string.Empty;

         public ICollection<Usuari>? Usuarios { get; set; }

    }
}
