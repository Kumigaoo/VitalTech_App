namespace HospitalApi.DTO
{
    public class PacientCreateDTO
    {

        public string DNI { get; set; } = string.Empty;
        public string NumSS { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Cognom1 { get; set; } = string.Empty;
        public string Cognom2 {  get; set; } = string.Empty;
        public string Sexe { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public Nacionalidad Nacionalidad { get; set; }
        public string Email {get; set; } = string.Empty;
        public int AdministratiuId {  get; set; }
        public DateTime BirthDay { get; set; }

    }
}
