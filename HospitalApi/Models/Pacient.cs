using System.ComponentModel.DataAnnotations;

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

        [Required]
        public DateTime BirthDay { get; set; }

        public ICollection<EpisodiMedic>? EpisodisMedics { get; set; }

    }
}
