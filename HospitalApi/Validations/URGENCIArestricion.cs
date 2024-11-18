using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class URGENCIASrestriction : ValidationAttribute
{

    public URGENCIASrestriction(string errorMessage = "El DNI debe contener 8 dígitos seguidos de una letra mayúscula.")
    {
        ErrorMessage = errorMessage;
    }
    public string TELEFON { get; }

    public string GetErrorMessage() => ErrorMessage;

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {

        if (value is int nivell) {

            if (nivell < 1 && nivell > 5) {

                return new ValidationResult("El nivell dalerta va de nivell 5 fins al nivell 1. No exiteix aquest nivell: " + nivell);

            }

        }

        return ValidationResult.Success;

    }

}