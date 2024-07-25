namespace HospitalAPI.DTO
{
    public class ConsultaCreateDTO
    {

        public bool Urgencia { get; set; }

        public string Dolencia { get; set; }

        public string Recepta { get; set; }

        public int PersonalId { get; set; }

        public int EpisodiMedicId { get; set; }
    }
}
