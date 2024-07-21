using HospitalXD.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalXD.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Consulta> Consultes { get; set; }
        public DbSet<EpisodiMedic> EpisodisMedics { get; set; }
        public DbSet<Habitacio> Habitacions { get; set; }
        public DbSet<Ingres> Ingressos { get; set; }
        public DbSet<Llit> Llits { get; set; }
        public DbSet<Metge> Metges { get; set; }
        public DbSet<Pacient> Pacients { get; set; }
        public DbSet<Planta> Plantes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Habitacio>()
            .HasOne(h => h.Planta)
            .WithMany(p => p.Habitacions)
            .HasForeignKey(h => h.PlantaId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Llit>()
            .HasOne(l => l.Habitacio)
            .WithMany(h => h.Llits)
            .HasForeignKey(l => l.HabitacioId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
            .HasOne(c => c.Pacient)
            .WithMany(p => p.Consultes)
            .HasForeignKey(c => c.PacientId)
            .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);

        }

    }
}
