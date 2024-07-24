using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class PersonalDTO
    
    {
        public int Id { get; set; }

        public string DNI { get; set; }

        public string Especialitat { get; set; }

        public string Nom { get; set; }

        public ICollection<Personal> Consultes { get; set; }
    }
}
