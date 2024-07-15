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

public DbSet<Camas> Camas { get; set; } = default!;

public DbSet<Habitaciones> Habitaciones { get; set; } = default!;

protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Camas>()
            .HasOne(c => c.Habitacion)
            .WithMany(h => h.Camas)
            .HasForeignKey(c => c.HabitacionId);

        modelBuilder.Entity<Camas>()
            .HasOne(c => c.Paciente)
            .WithOne(p => p.Cama)
            .HasForeignKey<Pacientes>(p => p.CamaId);
    }
}