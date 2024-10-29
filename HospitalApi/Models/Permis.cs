using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Permis
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public Accio Accio { get; set; }


    }
}
