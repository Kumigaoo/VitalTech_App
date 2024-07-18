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
        public DbSet<Habitacio> Habitacions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Habitacio>().HasData(
                new Habitacio()
                {
                    Id = 1,
                    Capacitat = 4
                },
                new Habitacio()
                {
                    Id = 2,
                    Capacitat = 5
                }
                );
        }

        // Creem una taula anomenada Llit que sera de tipus Llit (model)
        public DbSet<Llit> Llit { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Llit>().HasData(
                new Llit()
                {
                    Id = 1,
                    NumHabitacio = 4,
                    Estat = false
                },
                new Llit()
                {
                    Id = 2,
                    NumHabitacio = 4,
                    Estat = false
                }
                );
        }


    }
}
