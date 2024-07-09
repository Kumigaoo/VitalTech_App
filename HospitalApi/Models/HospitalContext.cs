using Microsoft.EntityFrameworkCore;
using HospitalApi.Models;

namespace HospitalApi.Models;

public class HospitalContext : DbContext
{
    public HospitalContext(DbContextOptions<HospitalContext> options)
        : base(options)
    {
    }

    public DbSet<Pacientes> Pacientes { get; set; } = null!;

public DbSet<HospitalApi.Models.Camas> Camas { get; set; } = default!;

public DbSet<HospitalApi.Models.Habitaciones> Habitaciones { get; set; } = default!;
}