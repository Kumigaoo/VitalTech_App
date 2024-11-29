namespace HospitalApi.DTO
{
    public class UsuariReadDTO
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email {get; set;} = string.Empty;
        public string RolId { get; set; } = string.Empty;

        public byte[] Imagen{ get; set; }
    }
}