using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.DTO
{
    public class AdministratiuCreateDTO
    {
        public string DNI { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public int Telefon { get; set; }
        public int UsuariId { get; set; }
        public string Hobby { get; set; } = string.Empty;
    }
}
