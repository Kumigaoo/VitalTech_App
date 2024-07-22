using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.Models
{
    public class User
    {

        [Key]        
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        public string Password { get; set; }

    }
}
