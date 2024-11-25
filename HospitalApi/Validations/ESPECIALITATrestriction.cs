using System.ComponentModel.DataAnnotations;
using HospitalAPI.Enums.Professions;
using HospitalAPI.Enums.Especialista;
using HospitalAPI.Enums.Cirujano;
using HospitalAPI.Enums.Enfermero;
using HospitalAPI.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Org.BouncyCastle.Security;

namespace HospitalAPI.Validations.ESPECIALITATrestriction
{


    public class ESPECIALITATrestriction : ValidationAttribute
    {

        private string especialitat = String.Empty;

        public ESPECIALITATrestriction(String especialitat)
        {
            this.especialitat = especialitat;
        }
        public string ESPECIALITATenfermer { get; }

        readonly Dictionary<string, Enum> rangsEspecialitat = new Dictionary<string, Enum>();

        private Dictionary<string, Enum> InicializarRangs()
        {

        rangsEspecialitat.Add("Medico", MedicoGeneral.MedicoGeneral);
        rangsEspecialitat.Add("Especialista", Especialista.Anestesiologo);
        rangsEspecialitat.Add("Infermer", Enfermero.EnfermeroDeCuidadosIntensivos);
        rangsEspecialitat.Add("Cirujia", Cirujano.CirujanoCardiovascular);

        return rangsEspecialitat;

        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {



            var rangsEspecialitat = InicializarRangs();
            // if(especialitat)
            Enum.TryParse(especialitat, out Cirujano e);
                        

            // if (rangsEspecialitat.TryGetValue("tif", out int[] rangEspecilitat))
            // {



            //     Console.WriteLine($"Para la clave 'tif', el valor es {value}.");
            // }
            // else
            // {
            //     Console.WriteLine("La clave 'tif' no se encuentra.");
            // }

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
}
