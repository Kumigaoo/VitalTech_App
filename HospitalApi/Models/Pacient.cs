using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Pacient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DNI { get; set; }

        [Required]
        public string NumSS { get; set; }

        [Required]
        public string Nom { get; set; }

        public string Sexe { get; set; }

        public ICollection<EpisodiMedic> EpisodisMedics { get; set; }

    }
}
