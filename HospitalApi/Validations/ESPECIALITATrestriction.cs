using System.ComponentModel.DataAnnotations;
using Org.BouncyCastle.Security;

public class ESPECIALITATrestriction : ValidationAttribute {

    private string especialitat;

    public ESPECIALITATrestriction(String especialitat)
    {
        this.especialitat = especialitat;
    }
    public string ESPECIALITATenfermer { get; }

    // Rangs enums amb especilaitats valides segons funcions
    readonly int mestgueGeneral = 1;
    readonly int[] especialistas = {2, 18};
    readonly int [] cirujians = {19, 24};
    readonly int [] enfermes = {25, 33};

    readonly Dictionary<string, int[]> rangsEspecialitat = new Dictionary<string, int[]>();

    //rangsEspecialitat.Add("Mestgues General", 1);

}