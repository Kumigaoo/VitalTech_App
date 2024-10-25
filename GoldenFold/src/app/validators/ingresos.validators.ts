import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class IngresosValidators {

  static noWhitespaceValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
      };
  }

}


export function dataIniciFinalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;

    const dataObertura = formGroup.get('dataEntrada')?.value;
    const dataSortida = formGroup.get('dataSortida')?.value;

    if(!dataObertura || !dataSortida){
      return null;
    }

    if(new Date(dataObertura) > new Date(dataSortida)){
      return { viatjeEnElTemps: true };
    }else {
      return null;
    }

  }
}


  export function dataInici(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const dataEntrada = formGroup.get('dataEntrada')?.value;
      if(dataEntrada==null) return null;
      if (new Date(dataEntrada) > new Date()) {
        return { dataInici: true };
      }
      return null;
    }
  }


