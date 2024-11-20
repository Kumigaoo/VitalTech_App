namespace HospitalApi.DTO
using System.ComponentModel.DataAnnotations;
using HospitalApi.Enums;
{
    public class PacientCreateDTO
    {

        [DNIrestriction]
        public string DNI { get; set; } = string.Empty;
        [TarjetaSANITARIArestriction]
        public string NumSS { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Cognom1 { get; set; } = string.Empty;
        public string Cognom2 {  get; set; } = string.Empty;
        [SEXErestriction]
        public string Sexe { get; set; } = string.Empty;
        [TELEFONrestriction]
        public string Telefono { get; set; } = string.Empty;
        public Nacionalidad Nacionalidad { get; set; }
        [EmailAddress ]
        public string Email {get; set; } = string.Empty;
        public int AdministratiuId {  get; set; }
        [DataType(DataType.Date)]
        public DateTime BirthDay { get; set; }

    }
}
