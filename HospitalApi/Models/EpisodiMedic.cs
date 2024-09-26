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

        public DateTime DataObertura {get; set;}

        public DateTime? DataTancament { get; set; }

        [Required]
        public string Dolencia { get; set; }

        [Required]
        public String Estat { get; set; }

        [ForeignKey("PacientId")]
        [JsonIgnore]
        [IgnoreDataMember]
        public string PacientId {get; set;}

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
