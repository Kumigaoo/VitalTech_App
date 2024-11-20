using HospitalAPI.Models;
using Mysqlx;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class EpisodiMedicCreateDTO
    {
        [Required]
        [DataType(DataType.Date, ErrorMessage = "Error de format de la data. AAAA/MM/DD")]
        public DateTime DataObertura { get; set; }
        [Required]
        public string Motivo { get; set; } = string.Empty;
        [Required]
        [URGENCIASrestriction]
        public string Urgencia {get; set;} = string.Empty;
        [Required]
        public string Recepta { get; set; } = string.Empty;
        [Required]
       // [ESTATrestriction]
        public string Estat { get; set; } = string.Empty;


        [NotMapped]
        public string DNIPacient { get; set; } = string.Empty;

        [NotMapped]
        public string DNIMetge { get; set; } = string.Empty;

    }
}
