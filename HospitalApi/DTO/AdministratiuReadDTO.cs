using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.DTO
{
    public class AdministratiuReadDTO
    {
        public int AdministratiuId { get; set; }
        [DNIrestriction]
        public string AdministratiuDni { get; set; }
        [Required]
        public string AdministratiuNom { get; set; }
    }
}
