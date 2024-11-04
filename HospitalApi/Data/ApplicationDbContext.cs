using HospitalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<PruebasDiagnosticas> PruebasDiagnosticas { get; set; }
        public DbSet<EpisodiMedic> EpisodisMedics { get; set; }
        public DbSet<Habitacio> Habitacions { get; set; }
        public DbSet<Ingres> Ingressos { get; set; }
        public DbSet<Llit> Llits { get; set; }
        public DbSet<Usuari> Usuari { get; set; }
        public DbSet<Pacient> Pacients { get; set; }
        public DbSet<Planta> Plantes { get; set; }
        public DbSet<Rol> Rol { get; set; }
        public DbSet<Permis> Permisos { get; set; }
        public DbSet<Entitat> Entitats { get; set; }
        public DbSet<RolPermisEntitat> RolPermisEntitats { get; set; }
        public DbSet<Administratiu> Administratius { get; set; }
        public DbSet<Enfermer> Enfermer { get; set; }
        public DbSet<AdministradorSistema> AdministradorSistema { get; set; }
        public DbSet<Metge> Metges { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Rol>().ToTable("Rol");
            modelBuilder.Entity<Metge>().ToTable("Metge");
            modelBuilder.Entity<Administratiu>().ToTable("Administratiu");
            modelBuilder.Entity<Enfermer>().ToTable("Enfermer");
            modelBuilder.Entity<AdministradorSistema>().ToTable("AdministradorSistema");

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
            .HasForeignKey(h => h.EpisodiMedicId)
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

            modelBuilder.Entity<PruebasDiagnosticas>()
            .HasOne(c => c.EpisodiMedic)
            .WithMany(p => p.PruebasDiagnosticas)
            .HasForeignKey(c => c.EpisodiMedicId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PruebasDiagnosticas>()
            .HasOne(c => c.Metge)
            .WithMany(p => p.PruebasDiagnosticas)
            .HasForeignKey(c => c.MetgeId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PruebasDiagnosticas>()
            .HasOne(c => c.Enfermer)
            .WithMany(p => p.PruebasDiagnosticas)
            .HasForeignKey(c => c.EnfermerId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Usuari>()
            .HasOne(c => c.Rol)
            .WithMany(p => p.Usuarios)
            .HasForeignKey(c => c.RolId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Habitacio>()
            .HasIndex(e => e.CodiHabitacio)
            .IsUnique();

            modelBuilder.Entity<Llit>()
            .HasIndex(e => e.CodiLlit)
            .IsUnique();

            modelBuilder.Entity<Pacient>()
            .HasIndex(e => e.DNI)
            .IsUnique();

            modelBuilder.Entity<Personal>()
            .HasIndex(e => e.DNI)
            .IsUnique();

            modelBuilder.Entity<Pacient>()
            .HasIndex(e => e.NumSS)
            .IsUnique();

            modelBuilder.Entity<Usuari>()
            .HasIndex(e => e.Username)
            .IsUnique();

            modelBuilder.Entity<Planta>()
            .HasIndex(e => e.Piso)
            .IsUnique();

            base.OnModelCreating(modelBuilder);

        }
    }
}
