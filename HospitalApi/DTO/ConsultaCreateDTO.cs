namespace HospitalAPI.DTO
{
    public class ConsultaCreateDTO
    {

        public bool Urgencia { get; set; }

        public string Sintomatologia { get; set; }

        public string Recepta { get; set; }

        public int PersonalId { get; set; }

        public int EpisodiMedicId { get; set; }
    }
}
