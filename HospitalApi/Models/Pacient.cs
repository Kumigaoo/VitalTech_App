using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Pacient
    {
        [Key]
        [Required]
        [MinLength(9, ErrorMessage = "El DNI debe tener 9 caracteres.")]
        public string DNI { get; set; }

        [Required]
        [MinLength(12, ErrorMessage = "El Numero de la Seguridad Social debe tener 12 caracteres.")]
        public string NumSS { get; set; }

        [Required]
        public string Nom { get; set; }

        public string Sexe { get; set; }

        public ICollection<EpisodiMedic> EpisodisMedics { get; set; }

    }
}
