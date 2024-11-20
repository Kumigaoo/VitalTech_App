using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class LlitUpdateDTO
    {
        [RegularExpression(@"^\d{3}[A-Z]$", ErrorMessage = "El format no es vlaid. Tenen que ser 3 digits seguits d'una lletra majuscula.")]
        public string CodiLlit { get; set; } = string.Empty;
        [Required]
        public bool ForaDeServei {get;set;}
        [NotMapped]
        [RegularExpression(@"^\d{3}$", ErrorMessage = "El format no es vlaid. Tenen que ser 3 digits numerics.")]
        public int CodiHabitacio { get; set; }

       
    }
}