using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class PacientDTO
    {

        public string DNI { get; set; }

        public string NumSS { get; set; }

        public string Nom { get; set; }

        public string Estat { get; set; }

        public string Sexe { get; set; }

        public ICollection<ConsultaDTO> Consultes { get; set; }

        public ICollection<EpisodiMedicDTO> EpisodisMedics { get; set; }


    }
}
