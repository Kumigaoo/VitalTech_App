using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class LlitUpdateDTO
    {
   
        public string CodiLlit { get; set; } = string.Empty;
        
        public bool ForaDeServei {get;set;}
        [NotMapped]
        public int CodiHabitacio { get; set; }

       
    }
}