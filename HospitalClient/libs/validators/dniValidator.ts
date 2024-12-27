import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dni = control.value?.toUpperCase();
    const dniRegex = /^[0-9]{8}[A-Z]$/;

    if (!dni || !dniRegex.test(dni)) {
      return { dniInvalid: true };
    }

    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = parseInt(dni.slice(0, 8), 10);
    const letter = dni.slice(-1);

    const expectedLetter = letters[number % 23];

    return expectedLetter === letter ? null : { dniInvalid: true };
  };
}
