using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace HospitalAPI.Models
{
    public class Ingres
    {

        [Key]
        public int Id { get; set; }

        public DateTime DataEntrada { get; set; }

        public DateTime? DataSortida { get; set; }

        [ForeignKey("EpisodiMedicId")]
        public int EpisodiMedicId {  get; set; }
        public EpisodiMedic EpisodiMedic { get; set; }

        [ForeignKey("LlitId")]
        public int LlitId {  get; set; }
        public Llit Llit { get; set; }

    }
}
