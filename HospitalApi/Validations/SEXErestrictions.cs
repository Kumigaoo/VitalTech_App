using System.ComponentModel.DataAnnotations;

public class SEXErestriction : ValidationAttribute {

 public SEXErestriction(string errorMessage = "No exiteix aques sexe, solament masculi o femeni.")
    {
        ErrorMessage = errorMessage;
    }
    public string SEXE { get; }

    public string GetErrorMessage() => ErrorMessage;

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {

        if (!(value is string sexe) || !(sexe.ToUpper() == "MASCULI" || sexe.ToUpper() == "FEMENI")) {

            return new ValidationResult("ErrorMessage");

        }

        return ValidationResult.Success;

    }

}