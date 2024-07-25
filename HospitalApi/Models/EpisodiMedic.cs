using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace HospitalAPI.Models
{
    public class EpisodiMedic
    {
        [Key]
        public int Id {get; set;}
        public DateTime Data {get; set;}

        [ForeignKey("PacientId")]
        [JsonIgnore]
        [IgnoreDataMember]
        public int PacientId {get; set;}
        [JsonIgnore]
        [IgnoreDataMember]
        public Pacient Pacient {get; set;}

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Consulta> Consultes {get; set;}
        
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Ingres> Ingressos {get; set;}

    }
}
