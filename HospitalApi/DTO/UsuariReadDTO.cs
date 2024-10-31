namespace HospitalApi.DTO
{
    public class UsuariReadDTO
    {

        public string Username { get; set; } = string.Empty;
        public string Email {get; set;} = string.Empty;
        public int RolId { get; set; }
        public ICollection<PruebasDiagnosticasReferenceDTO>? PruebasDiagnosticas { get; set; }
        public ICollection<EpisodiMedicReferenceDTO>? EpisodisMedics { get; set; }

    }
}