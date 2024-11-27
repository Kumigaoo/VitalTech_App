using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text.RegularExpressions;

public class TarjetaSANITARIArestriction : ValidationAttribute
{
    public TarjetaSANITARIArestriction(string errorMessage = "El número de tarjeta sanitaria es inválido.")
    {
        ErrorMessage = errorMessage;
    }

    private static bool ValidarFormato(string numeroTarjeta)
    {
        // Patrón general: 4 letras + "0" + 6 dígitos de fecha + "00" + 1 dígito
        const string pattern = @"^[A-Z]{4}0\d{6}00\d$";
        return Regex.IsMatch(numeroTarjeta, pattern);
    }

    private static bool ValidarFecha(string fecha)
    {
        // Extraer año, mes y día de la fecha
        string anio = fecha.Substring(0, 2);
        string mes = fecha.Substring(2, 2);
        string dia = fecha.Substring(4, 2);

        // Convertir el año a formato completo (2000 + XX)
        int anioCompleto = 2000 + int.Parse(anio);

        // Validar si la fecha es válida
        return DateTime.TryParseExact(
            $"{anioCompleto}-{mes}-{dia}",
            "yyyy-MM-dd",
            CultureInfo.InvariantCulture,
            DateTimeStyles.None,
            out _
        );
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // Manejo de valores nulos o vacíos
        if (value == null || value is not string numeroTarjeta)
        {
            return new ValidationResult("El valor proporcionado no es válido o está vacío.");
        }

        // Validar el formato general
        if (!ValidarFormato(numeroTarjeta))
        {
            return new ValidationResult("El formato de la tarjeta sanitaria es inválido.");
        }

        // Extraer y validar las primeras 4 letras
        string letras = numeroTarjeta.Substring(0, 4);
        string primerApellido = letras.Substring(0, 2);
        string segundoApellido = letras.Substring(2, 2);

        // Asumimos que un modelo que contiene los apellidos y fecha de nacimiento existe:
        // - Aquí puedes implementar la lógica para verificar que las letras coincidan con los apellidos.
        // Por ahora, omitiremos esa parte.

        // Extraer y validar la fecha de nacimiento
        string fecha = numeroTarjeta.Substring(5, 6);
        if (!ValidarFecha(fecha))
        {
            return new ValidationResult("La fecha de nacimiento en la tarjeta sanitaria es inválida.");
        }

        // Validar el último dígito (0–9). Ya es implícito por el patrón, pero lo revisamos.
        char ultimoDigito = numeroTarjeta[^1];
        if (!char.IsDigit(ultimoDigito))
        {
            return new ValidationResult("El último dígito de la tarjeta sanitaria es inválido.");
        }

        return ValidationResult.Success;
    }
}
