using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class TarjetaSANITARIArestriction : ValidationAttribute {

    public TarjetaSANITARIArestriction(string errorMessage = "Numero targueta sanitaria es invalid.")
    {
        ErrorMessage = errorMessage;
    }
    public string NumSS { get; }

    public string GetErrorMessage()
    {
        return ErrorMessage;
    }

      private static bool ValidarDigitoDeControl(string numeroTarjeta)
    {

        string numeros = Regex.Replace(numeroTarjeta, @"[A-Z]", ""); // Eliminar letras
        int suma = 0;

        for (int i = 0; i < numeros.Length; i++)
        {
            suma += int.Parse(numeros[i].ToString());
        }

        return suma % 10 == 0;
    }

       protected static ValidationResult? ValidarTarjetaSanitaria(string numeroTarjeta)
    {

        const string pattern = @"^[A-Z]{0,2}\d{8,10}$";
        if (!Regex.IsMatch(numeroTarjeta, pattern))
        {
            return new ValidationResult("Format invalid");
        }

        string prefijo = numeroTarjeta.Length > 10 ? numeroTarjeta.Substring(0, 2).ToUpper() : "";
        string[] prefijosValidos = { "CA", "MA", "AN", "BA" }; // Lista de ejemplos
        if (!string.IsNullOrEmpty(prefijo) && !Array.Exists(prefijosValidos, p => p == prefijo))
        {
            return new ValidationResult("Prefix invalid.");
        }

        if (!ValidarDigitoDeControl(numeroTarjeta))
        {
            return new ValidationResult("Digit de control invalid.");
        }

        return ValidationResult.Success;
    }

}