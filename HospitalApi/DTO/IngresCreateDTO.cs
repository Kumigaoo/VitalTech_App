namespace HospitalApi.DTO
{
    public class IngresCreateDTO
    {

        public DateTime DataEntrada { get; set; }

        public DateTime? DataSortida { get; set; }

        public int EpisodiMedicId { get; set; }

        public string LlitId { get; set; }

    }
}
