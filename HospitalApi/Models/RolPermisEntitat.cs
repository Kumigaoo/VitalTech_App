using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class RolPermisEntitat
    {

        [Key]        
        public int Id { get; set; }

        [ForeignKey("Rol")]
        public int RolId { get; set; }
        public Rol? Rol { get; set; }

        [ForeignKey("Permis")]
        public int PermisId { get; set; }
        public Permis? Permis { get; set; }

        [ForeignKey("Enitat")]
        public int EnitatId { get; set; }
        public Entitat? Entiat { get; set; }

    }
}
