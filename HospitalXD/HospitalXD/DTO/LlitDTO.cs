using System.ComponentModel.DataAnnotations;
using HospitlaXD.DTO;

namespace HospitlaXD.DTO
{

    public class Llit
    {

        [Required]
        public int Id { get; set; }

        [Required]
        public int NumHabitacio { get; set; }

        public bool Estat { get; set; }


    }

}