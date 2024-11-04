using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Permis
    {

        [Key]        
        public Accio Id { get; set; }

        [Required]
        public Accio Accio { get; set; }


    }
}
