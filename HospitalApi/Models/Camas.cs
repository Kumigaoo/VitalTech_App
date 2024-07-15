namespace HospitalApi.Models;

public class Camas
{
    public long Id { get; set; }
    public bool Estat { get; set; }
    public long HabitacionId { get; set; } 
    public Habitaciones Habitacion { get; set; } = null!;
    public long? PacienteId { get; set; }
    public Pacientes? Paciente { get; set; }
}