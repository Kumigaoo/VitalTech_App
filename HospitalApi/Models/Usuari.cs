using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class Usuari
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Email {get; set;} = string.Empty;

        [ForeignKey("Rol")]
        public int RolId { get; set; }
        public Rol? Rol { get; set; }

        public ICollection<PruebasDiagnosticas>? PruebasDiagnosticas { get; set; }

        public ICollection<EpisodiMedic>? EpisodisMedics { get; set; }



    }
}
