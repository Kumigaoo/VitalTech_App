using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class EnfermerCreateDTO : Rol
    {
        [Required]
        public string EnfermerDNI { get; set; } = string.Empty;

        public string EnfermerNom { get; set; } = string.Empty;

        public string EnfermerEspecialitat { get; set; } = string.Empty;

    }
}
