using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Entitat
    {

        [Key]        
        public required string Tablas { get; set; }


    }
}
