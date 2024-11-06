namespace HospitalApi.DTO
{
    public class UsuariCreateDTO
    {

        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email {get; set;} = string.Empty;
        public string RolId { get; set; } = string.Empty;

    }
}