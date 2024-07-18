
/*
 Aquest DTO només serveix per quan el usuari vol fer un put a la bbdd
 */

using System.ComponentModel.DataAnnotations;

namespace HospitalXD.DTO
{
    public class HabitacioUpdateDbDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Capacitat { get; set; }
    }
}
