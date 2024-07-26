namespace HospitalAPI.DTO
{
    public class ConsultaDTO
    {
        public int Id { get; set; }

        public bool Urgencia { get; set; }

        public string Sintomatologia { get; set; }

        public string? Recepta { get; set; }

        public string PersonalId { get; set; }

        public int EpisodiMedicId { get; set; }
    }
}
