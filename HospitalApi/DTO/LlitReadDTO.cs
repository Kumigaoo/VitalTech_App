using System.ComponentModel.DataAnnotations.Schema;
using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class LlitReadDTO
    {
        public string CodiLlit { get; set; } = string.Empty;
        public bool Ocupat {get;set;}
        public bool ForaDeServei {get;set;}

        [NotMapped]
        public int CodiHabitacio { get; set; }
        public ICollection<IngresReferenceDTO>? Ingressos { get; set; }
    }
}
