using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class LlitReferenceDTO
    {
        [RegularExpression(@"^\d{3}[A-Z]$", ErrorMessage = "El format no es vlaid. Tenen que ser 3 digits seguits d'una lletra majuscula.")]
        public string CodiLlit { get; set; } = string.Empty;
        [Required]
        public bool Ocupat { get; set; }
        [Required]
        public bool ForaDeServei { get; set; }

    }
}
