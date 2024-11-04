using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class RolReadDTO
    {
        public string NomRol { get; set; }

        public string Descripcio { get; set; }

        public ICollection<Usuari>? Usuarios { get; set; }
    }
}
