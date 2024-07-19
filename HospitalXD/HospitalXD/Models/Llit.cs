<<<<<<< HEAD
﻿namespace HospitalXD.Models
{
    public class Llit
    {

        public int Id { get; set; }

        public bool Ocupat { get; set; }

        public Habitacio Habitacio { get; set; }

    }
}
=======
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalXD.Models
{

    public class Llit
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int NumHabitacio { get; set; }

        public bool Estat { get; set; }

        public Habitacio? Habitacion { get; set; } = null!;


    }

}
>>>>>>> a1f42602bb94ee20bae41bbd86e5730a9866edf6
