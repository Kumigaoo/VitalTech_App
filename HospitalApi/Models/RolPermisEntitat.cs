using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class RolPermisEntitat
    {

        [Key]
        public int Id { get; set; }

        [ForeignKey("RolId")]
        public required string RolId { get; set; }
        public Rol? Rol { get; set; }

        [ForeignKey("PermisId")]
        public required string PermisId { get; set; }
        public Permis? Permis { get; set; }

        [ForeignKey("EntitatId")]
        public required string EntitatId { get; set; }
        public Entitat? Entitat { get; set; }

    }
}
