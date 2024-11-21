using System.ComponentModel.DataAnnotations;
using Org.BouncyCastle.Security;

public class ESPECIALITATrestriction : ValidationAttribute
{

    private string especialitat;

    public ESPECIALITATrestriction(String especialitat)
    {
        this.especialitat = especialitat;
    }
    public string ESPECIALITATenfermer { get; }

    readonly Dictionary<string, int[]> rangsEspecialitat = new Dictionary<string, int[]>();

    private Dictionary<string, int[]> InicializarRangs()
    {
        rangsEspecialitat.Add("Metges General", new int[] { 1, 1 });
        rangsEspecialitat.Add("Especialista", new int[] { 2, 18 });
        rangsEspecialitat.Add("Cirurgia", new int[] { 19, 24 });
        rangsEspecialitat.Add("Infermer", new int[] { 25, 33 });

        return rangsEspecialitat;

    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {

        var rangsEspecialitat = InicializarRangs();

        if (rangsEspecialitat.TryGetValue("tif", out int[] rangEspecilitat))
        {

            

            Console.WriteLine($"Para la clave 'tif', el valor es {value}.");
        }
        else
        {
            Console.WriteLine("La clave 'tif' no se encuentra.");
        }

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