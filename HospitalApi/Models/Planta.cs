namespace HospitalAPI.Models
{
    public class Planta
    {

        public int Id { get; set; }

        public int CapacitatHabitacions { get; set; }

        public ICollection<Habitacio> Habitacions { get; set; }

    }
}
