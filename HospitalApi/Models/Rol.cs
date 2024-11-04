using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Rol
    {

        [Key]        
        public string Nom { get; set; } = string.Empty;

        public string Descripcio { get; set; } = string.Empty;

        public ICollection<Usuari>? Usuarios { get; set; }

    }
}
