using HospitalAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class IngresReadDTO

    {
        public int Id { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime? DataSortida { get; set; }
        public int EpisodiMedicId { get; set; }

        [NotMapped]
        public string CodiLlit { get; set; } = string.Empty;
       

    }
}
