using System.ComponentModel.DataAnnotations;
using HospitlaXD.DTO;

namespace HospitlaXD.DTO
{

    public class PacientDTO
    {

        [Required]
        public int Id { get; set; }

        [Required]
        public int CamaId { get; set; }

        public string? Name { get; set; }
        public string DNI { get; set;} = null!;
        public string NumSS { get; set;} = null!;
        public bool Estat { get; set; }


    }

}