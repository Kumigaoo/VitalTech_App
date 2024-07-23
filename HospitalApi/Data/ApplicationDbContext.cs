using HospitalAPI.Models;
using Microsoft.EntityFrameworkCore;

// Link Tuto BD: https://learn.microsoft.com/es-es/training/modules/persist-data-ef-core/

namespace HospitalApi.Data
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
        public DbSet<Personal> Personals { get; set; }
        public DbSet<Pacient> Pacients { get; set; }
        public DbSet<Planta> Plantes { get; set; }
        public DbSet<User> Users { get; set; }

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

            modelBuilder.Entity<Ingres>()
            .HasOne(h => h.EpisodiMedic)
            .WithMany(p => p.Ingressos)
            .HasForeignKey(h => h.LlitId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ingres>()
           .HasOne(h => h.Llit)
           .WithMany(p => p.Ingressos)
           .HasForeignKey(h => h.LlitId)
           .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EpisodiMedic>()
            .HasOne(h => h.Pacient)
            .WithMany(p => p.EpisodisMedics)
            .HasForeignKey(h => h.PacientId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
            .HasOne(c => c.Pacient)
            .WithMany(p => p.Consultes)
            .HasForeignKey(c => c.PacientId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
            .HasOne(c => c.EpisodiMedic)
            .WithMany(p => p.Consultes)
            .HasForeignKey(c => c.EpisodiMedicId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
            .HasOne(c => c.Personal)
            .WithMany(p => p.Consultes)
            .HasForeignKey(c => c.PersonalId)
            .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);

        }

    }
}
