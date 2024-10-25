import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class IngresosValidators {

  static noWhitespaceValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
      };
  }

  static dataInici(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const dataEntrada = formGroup.get('dataEntrada')?.value;
      if(dataEntrada==null) {
        return null;
      }
      if (new Date(dataEntrada) > new Date()) {
        return { dataInici: true };
      }
      return null;
    }
  }
}