using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalXD.Models
{

    public class Llit
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int Id { get; set; }

        [Required]
        int NumHabitacio { get; set; }

        bool Estat { get; set; }


    }

}