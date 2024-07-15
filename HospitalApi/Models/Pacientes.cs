namespace HospitalApi.Models;

public class Pacientes
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string DNI { get; set;} = null!;
    public string NumSS { get; set;} = null!;
    public bool Estat { get; set; }
    public Camas? camas { get; set; }
}