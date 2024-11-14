using System.ComponentModel.DataAnnotations;
using HospitalAPI.Models;

namespace HospitalAPI.DTO
{
    public class AdministradorSistemaReadDTO
    {
    public string DNI {get; set;} = string.Empty;
    public string Nom {get; set;} = string.Empty;
    public int Telefon {get; set;}
    public string UsuariId { get; set; } = string.Empty;

    public string Hobby { get; set; } = string.Empty;
    }
}