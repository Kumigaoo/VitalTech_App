namespace HospitalApi.DTO
{
    public class IngresReferenceDTO
    {

        public int Id { get; set; }
        public DateTime DataEntrada { get; set; }

        public DateTime? DataSortida { get; set; }
        
        public int EpisodiMedicId { get; set; }

    }
}
