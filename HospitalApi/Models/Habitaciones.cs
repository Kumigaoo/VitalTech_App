namespace HospitalApi.Models;

public class Habitaciones
{
    public long Id { get; set; }
    public int Capacity { get; set; }
    public ICollection<Camas> Camas { get; set; } = new List<Camas>();

}