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

    modelBuilder.Entity<Camas>(entity =>
    {
        entity.ToTable("Camas");

        entity.HasKey(e => e.Id);

        entity.Property(e => e.Id)
            .HasColumnName("Id")
            .ValueGeneratedOnAdd();

        entity.Property(e => e.Estat)
            .HasColumnName("Estat")
            .IsRequired();

        entity.Property(e => e.HabitacionId)
            .HasColumnName("HabitacionId")
            .IsRequired();

        entity.HasOne(e => e.Habitacion)
            .WithMany()
            .HasForeignKey(e => e.HabitacionId)
            .OnDelete(DeleteBehavior.Cascade); // Opcional: define la acción de eliminación en cascada si es necesario

        entity.Property(e => e.PacienteId)
            .HasColumnName("PacienteId");

        entity.HasOne(e => e.Paciente)
            .WithOne(p => p.Cama)
            .HasForeignKey<Pacientes>(e => e.CamaId)
            .OnDelete(DeleteBehavior.SetNull); // Opcional: define la acción de eliminación en cascada si es necesario
    });

    modelBuilder.Entity<Habitaciones>(entity =>
    {
        entity.ToTable("Habitaciones");

        entity.HasKey(e => e.Id);

        entity.Property(e => e.Id)
            .HasColumnName("Id")
            .ValueGeneratedOnAdd();

        entity.Property(e => e.Capacity)
            .HasColumnName("Capacity")
            .IsRequired();
    });

    modelBuilder.Entity<Pacientes>(entity =>
    {
        entity.ToTable("Pacientes");

        entity.HasKey(e => e.Id);

        entity.Property(e => e.Id)
            .HasColumnName("Id")
            .ValueGeneratedOnAdd();

        entity.Property(e => e.Name)
            .HasColumnName("Name")
            .IsRequired();

        entity.Property(e => e.DNI)
            .HasColumnName("DNI")
            .IsRequired();

        entity.Property(e => e.NumSS)
            .HasColumnName("NumSS")
            .IsRequired();

        entity.Property(e => e.Estat)
            .HasColumnName("Estat")
            .IsRequired();

        entity.Property(e => e.CamaId)
            .HasColumnName("CamaId");

        entity.HasOne(e => e.Cama)
            .WithOne(p => p.Paciente)
            .HasForeignKey<Pacientes>(e => e.CamaId)
            .OnDelete(DeleteBehavior.SetNull); // Opcional: define la acción de eliminación en cascada si es necesario
    });
}
}