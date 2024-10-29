using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Entiat
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public Accio accio { get; set; }


    }
}
