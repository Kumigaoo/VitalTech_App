namespace HospitalApi.Models;

public class Habitaciones
{
    public long Id { get; set; }
    public int Capacity { get; set; }
    public virtual ICollection<Camas> camas { get; set; } = new List<Camas>();

}