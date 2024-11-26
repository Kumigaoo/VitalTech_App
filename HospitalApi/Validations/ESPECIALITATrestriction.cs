using System.ComponentModel.DataAnnotations;
using HospitalAPI.Enums.Professions;
using HospitalAPI.Enums.Especialista;
using HospitalAPI.Enums.Cirujano;
using HospitalAPI.Enums.Enfermero;
using HospitalAPI.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Org.BouncyCastle.Security;
using Microsoft.EntityFrameworkCore.Metadata.Internal;



public class ESPECIALITATrestriction : ValidationAttribute
{

    private string especialitat = String.Empty;

    private Dictionary<string, Type> rangs;

    public ESPECIALITATrestriction(String especialitat)
    {
        this.especialitat = especialitat;
        rangs = InicializarRangs();
    }

    public ESPECIALITATrestriction()
    {
        rangs = InicializarRangs();
    }

    public string ESPECIALITATenfermer { get; }

    readonly Dictionary<string, Type> rangsEspecialitat = new Dictionary<string, Type>();

    private Dictionary<string, Type> InicializarRangs()
    {

        rangsEspecialitat.Add("Medico", typeof(MedicoGeneral));
        rangsEspecialitat.Add("Especialista", typeof(Especialista));
        rangsEspecialitat.Add("Infermer", typeof(Enfermero));
        rangsEspecialitat.Add("Cirujia", typeof(Cirujano));

        return rangsEspecialitat;

    }

    

    private void MostrarRangs(string Key)
    {
        
        foreach (var rang in rangs)
        {
            Console.WriteLine($"Clave: {rang.Key}");
            var enumType = rang.Value;
            var valors = (Type)Enum.Parse(typeof(Type), rang.ToString());
            Console.WriteLine(valors);
            
        }
        
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // if(especialitat)
        Enum.TryParse(especialitat, out Cirujano e);


        MostrarRangs(especialitat);


        string[] ids = { "1", "2", "3" };

        foreach (string especialitat in ids)
        {

            if (this.especialitat == especialitat)
            {

                return ValidationResult.Success;


            }

        }

        return new ValidationResult("Lespecialitat no existeix, o es d'una altre branque medica.");

    }

}

