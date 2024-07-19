using HospitalXD.Models;
using Microsoft.EntityFrameworkCore;

/*
 
    Aquesta classe utilitzara una forma de genera la bd que es diu code first
    Basicament gracies a aquesta classe li podrem dir a ef quins models seran
    Els que generar la bbdd, es a dir, que amb el sistema code first,
    Creem la base de dades a partir dels models
 
 */

namespace HospitalXD.Data
{
    public class ApplicationDbContext : DbContext
    {

        // Aqui podem crea un construcor on podrem fer una injeccio de dependecies
        // gracies a que hem generat els servei a program.cs

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }



        // Creem una taula anomenada habitacions que sera de tipus habitacio (model)

        public DbSet<Consulta> Consultes { get; set; }

        public DbSet<EpisodiMedic> EpisodisMedics { get; set; }

        public DbSet<Habitacio> Habitacions { get; set; }

        public DbSet<Ingres> Ingressos { get; set; }

        public DbSet<Llit> Llits { get; set; }

        public DbSet<Metge> Metges { get; set; }

        public DbSet<Pacients> Pacients { get; set; }

        public DbSet<Planta> Plantes { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Consulta>()
                .HasOne<Pacient>(p => p.Pacient)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
                .HasOne<Metge>(m => m.Metge)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
                .HasOne<EpisodiMedic>(e => e.EpisodiMedic)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EpisodiMedic>()
                .HasOne<Pacient>(e => e.Pacient)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Habitacio>()
                .HasOne<Planta>(e => e.Planta)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ingres>()
                .HasOne<EpisodiMedic>(e => e.EpisodiMedic)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ingres>()
                .HasOne<Llit>(e => e.Llit)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Llit>()
                .HasOne<Habitacio>(e => e.Habitacio)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Llit>().HasData(
           new Llit()
           {
               Id = 1,
               Ocupat = false
           },
           new Llit()
           {
               Id = 2,
               Ocupat = false
           }
           );

           modelBuilder.Entity<Pacients>().HasData(
           new Pacients()
           {
               Id = 1,
               Name = "Maria",
               DNI = "77777",
               NumSS = "22222",
               Estat = false,
               CamaId = 2
           },
           new Pacients()
           {
               Id = 2,
               Name = "Sofia",
               DNI = "3773737",
               NumSS = "6666",
               Estat = true,
               CamaId = 1
           }
           );

        }

            
        }
    }
}
