using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class IngresCreateDTO
    {

        [DataType(DataType.Date)]
        public DateTime DataEntrada { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DataSortida { get; set; }
        [Required]
        public int EpisodiMedicId { get; set; }
        [Required]
        public string CodiLlit { get; set; } = string.Empty;

    }
}
