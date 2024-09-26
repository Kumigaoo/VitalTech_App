namespace HospitalApi.DTO
{
    public class EpisodiMedicUpdateDTO
    {

        public int Id { get; set; }

        public DateTime DataObertura { get; set; }

        public DateTime? DataTancament { get; set; }

        public string Dolencia { get; set; }

        public String Estat { get; set; }

        public string PacientId { get; set; }

    }
}
