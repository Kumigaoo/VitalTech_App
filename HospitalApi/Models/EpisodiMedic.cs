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
        public string? Motivo { get; set; }

        public string? Urgencia {get; set;}

        public string? Recepta { get; set; }

        [Required]
        public string Estat { get; set; } = string.Empty;

        [ForeignKey("PacientId")]
        [JsonIgnore]
        [IgnoreDataMember]
        public int PacientId {get; set;}

        [JsonIgnore]
        [IgnoreDataMember]
        public Pacient? Pacient { get; set; }

        [ForeignKey("MetgeId")]
        [JsonIgnore]
        [IgnoreDataMember]
        public int MetgeId {get; set;}

        [JsonIgnore]
        [IgnoreDataMember]
        public Metge? Metge { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<PruebasDiagnosticas>? PruebasDiagnosticas {get; set;}
        
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Ingres>? Ingressos {get; set;}

    }
}
