import {
    AbstractControl,
    ValidationErrors,
    AsyncValidatorFn,
  } from '@angular/forms';
  import { Observable, of } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { ConsultaService } from '../services/consulta.service';
 
 
export const asyncConsultaExistsValidator = (consultaService: ConsultaService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const idPaciente = control.value;
  
      if (!idPaciente) {
        return of(null);   // si no hi ha res escrit no fer validació
      }
  
      return consultaService.getConsultas(idPaciente).pipe(
        map((consultas) => {
          return consultas.length > 0 ? null : { consultaNotFound: true };
        }),
        catchError(() => of({ consultaNotFound: true }))
      );
    };
  };
  

  