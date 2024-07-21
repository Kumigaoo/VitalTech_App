using HospitalAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalAPI.DTO
{
    public class LlitDTO
    {

        public int Id { get; set; }
        
        public bool Ocupat { get; set; }

        public bool ForaDeServei { get; set; }

        public int HabitacioId { get; set; }

        public ICollection<Ingres> Ingressos { get; set; }

    }
}
