namespace HospitalApi.DTO
{
    public class EpisodiMedicReferenceDTO
    {

        public int Id { get; set; }
        public DateTime DataObertura { get; set; }
        public DateTime? DataTancament { get; set; }
        public string Motivo { get; set; } = string.Empty;
        public string Estat { get; set; } = string.Empty;

    }
}
