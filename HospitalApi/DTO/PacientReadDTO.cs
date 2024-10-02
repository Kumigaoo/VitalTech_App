using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class PacientReadDTO
    {

        public string DNI { get; set; } = string.Empty;
        public string NumSS { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Sexe { get; set; } = string.Empty;
        public ICollection<EpisodiMedicReferenceDTO>? EpisodisMedics { get; set; }


    }
}
