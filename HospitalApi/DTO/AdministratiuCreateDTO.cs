using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.DTO
{
    public class AdministratiuCreateDTO
    {
        [DNIrestriction]
        public string AdministratiuDni { get; set; }
        [Required]
        public string AdministratiuNom { get; set; }
    }
}
