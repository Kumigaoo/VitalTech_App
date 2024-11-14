using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Serialization;

namespace HospitalAPI.Models
{
    public abstract class Personal
    {

        [Key]
        public int Id { get; set; }
        public string DNI { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public int Telefon { get; set; }

        [ForeignKey("UsuariId")]
        public int? UsuariId { get; set; }
        public Usuari? Usuari { get; set; }

    }

}