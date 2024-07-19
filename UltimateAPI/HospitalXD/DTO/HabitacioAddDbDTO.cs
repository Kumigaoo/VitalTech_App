
/*
 Aquest DTO només serveix per quan el usuari vol fer un post a la bbdd
 */


using System.ComponentModel.DataAnnotations;

namespace HospitalXD.DTO
{
    public class HabitacioAddDbDTO
    {
        [Required]
        public int Capacitat { get; set; }
    }
}
