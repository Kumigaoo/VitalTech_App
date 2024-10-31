using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Administratiu : Personal 
    {
        
        [Required]
        public string Area { get; set; } = string.Empty;

    }
}
