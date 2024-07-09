namespace HospitalApi.Models;

public class Camas
{
    public long Id { get; set; }
    public bool estat { get; set; }
    public long HabitacionId { get; set; }
        public virtual Habitaciones Habitacion { get; set; } = null!;
        public virtual ICollection<Pacientes> Pacientes { get; set; } = new List<Pacientes>();
}