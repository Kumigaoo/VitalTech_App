
/*
 Un DTO es un objecte que ens serveix per transferir les dades
que a mi m'interessa entre capes. Com del back al front per exemple
 */


using System.ComponentModel.DataAnnotations;

namespace HospitalXD.DTO
{
    public class HabitacioDTO
    {

        public int Id { get; set; }

        [Required]
        public int Capacitat { get; set; }
    }
}
