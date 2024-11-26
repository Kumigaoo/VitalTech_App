using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HospitalApi.Enums;

namespace HospitalAPI.Models
{
    public class Pacient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DNI { get; set; } = string.Empty;

        [Required]
        public string NumSS { get; set; } = string.Empty;

        [Required]
        public string Nom { get; set; } = string.Empty;

        [Required]
        public string Cognom1 { get; set; } = string.Empty;

        public string Cognom2 {  get; set; } = string.Empty;

        public string Sexe { get; set; } = string.Empty;

        public string Telefono {get; set;} = string.Empty;
        
        public Nacionalidad Nacionalidad {get; set;}

        public string Email {get; set;} = string.Empty;

        [ForeignKey("AdministratiuId")]
        public int AdministratiuId {  get; set; }
        public Administratiu? Administratiu { get; set; }

        [Required]
        public DateTime BirthDay { get; set; }

        public string? Estado { get; set; }

        public ICollection<EpisodiMedic>? EpisodisMedics { get; set; }

    }
}
