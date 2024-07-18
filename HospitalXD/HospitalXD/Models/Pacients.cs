using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalXD.Models
{

    public class Pacients
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int CamaId { get; set; }

        public string? Name { get; set; }
        public string DNI { get; set;} = null!;
        public string NumSS { get; set;} = null!;
        public bool Estat { get; set; }


    }

}