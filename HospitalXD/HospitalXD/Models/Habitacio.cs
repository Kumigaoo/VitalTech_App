/*

 Aquesta classe es un model, un model es una clase que ens serveix
per carrega dades de 
 
 */

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalXD.Models
{
    public class Habitacio
    {
        // Aixo fa referencia al ORM de .NET que es Entity Framework
        // Un ORM es una llibreria que permet mapegar els nostres models amb les taules de la BBDD
        // Tambe ens permet definir relacions entre aquests sense tenir que escriure sql

        // Indiquem al ORM que aixo sera un clau primaria
        [Key]
        // Per asignar-li el valor que li doni la base de dades al inserta el registre
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int Num_llits { get; set; }

        public int Capacitat { get; set; }

    }
}
