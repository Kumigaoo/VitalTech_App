using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class PacientDTO
    {

        public int Id { get; set; }

        public string NumSS { get; set; }

        public string Nom { get; set; }

        public string Estat { get; set; }

        public string Sexe { get; set; }

        public ICollection<Consulta> Consultes { get; set; }

        public ICollection<EpisodiMedic> EpisodisMedics { get; set; }


    }
}
