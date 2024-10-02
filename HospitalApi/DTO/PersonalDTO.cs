using HospitalAPI.Models;

namespace HospitalApi.DTO

{
    public class PersonalDTO
    
    {
        public string DNI { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

        public ICollection<ConsultaReadDTO>? Consultes { get; set; }
    }
}
