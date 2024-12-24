import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pisoCodigoValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const plantaId = group.get('plantaId')?.value; // Número de piso seleccionado
    const codiHabitacio = group.get('codiHabitacio')?.value; // Código de habitación ingresado

    // Si cualquiera de los dos campos está vacío, no se valida
    if (!plantaId || !codiHabitacio || String(codiHabitacio).length !== 3) {
      return null;
    }

    // Verifica si el primer número del código coincide con el piso
    const firstNumber = String(codiHabitacio).charAt(0);
    return firstNumber === String(plantaId)
      ? null
      : { pisoCodigoMismatch: true };
  };
}
