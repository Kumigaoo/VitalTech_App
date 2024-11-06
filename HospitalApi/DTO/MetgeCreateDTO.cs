using HospitalAPI.Models;

namespace HospitalApi.DTO
{
    public class MetgeCreateDTO
    {
        public string DNI { get; set; } = string.Empty;

        public string Especialitat { get; set; } = string.Empty;

        public string Nom { get; set; } = string.Empty;

<<<<<<< HEAD:HospitalApi/DTO/PersonalReadDTO.cs
        public ICollection<PruebaDiagnosticaReadDTO>? Consultes { get; set; }
=======
>>>>>>> 6062f97f908e83e3dd091d03a78e0d116cc01868:HospitalApi/DTO/MetgeCreateDTO.cs
    }
}
