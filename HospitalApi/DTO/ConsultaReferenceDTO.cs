using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalApi.DTO
{
    public class ConsultaReferenceDTO
    {
        public int Id { get; set; }
        public bool? Urgencia { get; set; }
        public string? Sintomatologia { get; set; }
        public string? Recepta { get; set; }
        [NotMapped]
        public string DNIPersonal { get; set; } = string.Empty;
        public int EpisodiMedicId { get; set; }
    }
}
