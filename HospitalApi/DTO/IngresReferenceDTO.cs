using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class IngresReferenceDTO
    {
        [Required]
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataEntrada { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DataSortida { get; set; }
        [Required]
        public int EpisodiMedicId { get; set; }

    }
}
