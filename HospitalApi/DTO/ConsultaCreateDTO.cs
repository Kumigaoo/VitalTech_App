namespace HospitalAPI.DTO
{
    public class ConsultaCreateDTO
    {

        public bool Urgencia { get; set; } = false;

        public string Sintomatologia { get; set; }

        public string? Recepta { get; set; }

        public string PersonalId { get; set; }

        public int EpisodiMedicId { get; set; }
    }
}
