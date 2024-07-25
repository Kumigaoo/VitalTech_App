using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace HospitalAPI.Models
{
    public class Llit
    {

        [Key]
        public int Id { get; set; }

        public bool Ocupat { get; set; }
        
        public bool ForaDeServei { get; set; }

        [ForeignKey("HabitacioId")]
        [JsonIgnore]
        [IgnoreDataMember]
        public int HabitacioId { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public Habitacio Habitacio { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Ingres> Ingressos { get; set; }

    }
}
