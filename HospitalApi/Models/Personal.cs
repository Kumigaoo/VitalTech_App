using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Personal
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string DNI { get; set; }
        public string Especialitat { get; set; }
        public string Nom { get; set; }
        public ICollection<Consulta> Consultes { get; set; }
    }
}
