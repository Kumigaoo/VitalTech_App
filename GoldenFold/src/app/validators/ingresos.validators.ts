import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class IngresosValidators {

  static noWhitespaceValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
      };
  }


}
