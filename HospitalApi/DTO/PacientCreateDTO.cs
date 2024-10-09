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

        public DateTime BirthDay { get; set; }

    }
}
