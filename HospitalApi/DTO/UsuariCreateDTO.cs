using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HospitalApi.DTO
{
    public class UsuariCreateDTO
    {

        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string RolId { get; set; } = string.Empty;
        public byte[] Imagen {get; set;}

    }
}