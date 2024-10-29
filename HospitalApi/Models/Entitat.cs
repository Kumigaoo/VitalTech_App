using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Entitat
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public Tablas Tablas { get; set; }


    }
}
