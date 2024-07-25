using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class PersonalDTO
    
    {
        public string DNI { get; set; }

        public string Especialitat { get; set; }

        public string Nom { get; set; }

        public ICollection<ConsultaDTO> Consultes { get; set; }
    }
}
