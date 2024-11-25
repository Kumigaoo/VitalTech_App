import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

export function dniExisteValidator(dniService: any, dniOriginal: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const dniActual = control.value;

    // Si el valor actual es igual al DNI original, no validar
    if (dniActual === dniOriginal) {
      return of(null);
    }

    // Validar solo si el valor ha cambiado
    return of(dniActual).pipe(
      debounceTime(300),
      switchMap(dni => dniService.verificarDni(dni)),
      map(existe => (existe ? { dniExiste: true } : null)),
      catchError(() => of(null)) // En caso de error, no marcar como inválido
    );
  };
}
