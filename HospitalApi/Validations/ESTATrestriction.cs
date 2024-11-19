using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class ESTATrestriction : ValidationAttribute
{
    public ESTATrestriction(string errorMessage = "El DNI debe contener 8 dígitos seguidos de una letra mayúscula.")
    {
        ErrorMessage = errorMessage;
    }
    public string TELEFON { get; }

    public string GetErrorMessage() => ErrorMessage;

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {

        if (value is not bool)
        {
            return new ValidationResult("El valor no es válido, solo se acepta un valor booleano.");
        }

        if (value == null)
        {
            return new ValidationResult("El valor no puede ser null, solo se aceptan true o false.");
        }

        return ValidationResult.Success;

    }

}