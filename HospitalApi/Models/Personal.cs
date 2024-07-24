namespace HospitalAPI.Models
{
    public class Personal
    {
        public int Id { get; set; }

        public string DNI { get; set; }

        public string Especialitat { get; set; }

        public string Nom { get; set; }

        public ICollection<Consulta> Consultes { get; set; }
    }
}
