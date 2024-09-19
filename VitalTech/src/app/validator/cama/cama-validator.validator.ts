import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, FormGroup, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CamasService } from '../../service/camas.service';
import { HabitacioService } from '../../service/habitaciones.service';


export function camaidValidator(camasService: CamasService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
          return of(null); 
        }

        return camasService.getLlit(control.value).pipe(
            map(llit => (llit ? { camaIdExists: true } : null)), 
            catchError(() => of(null)) 
        );
    };

    
}

export function habidValidator(habitacionService: HabitacioService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
          return of(null); 
        }

        const id = +control.value;

        return habitacionService.getHabitacio(id).pipe(
            map(habitacion => (
                 habitacion ? null : { habitacionIdNotFound: true }
            )),
            catchError( error => {
                return of({ habitacionIdNotFound: true });
            }

        ));
    };
}

export function codiLlitHabitacioValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        
        const codillit = formGroup.get('codiLlit')?.value;
        const habitacioId = formGroup.get('habitacioId')?.value;


        if(!codillit || !habitacioId){
            return null;
        }


        const codiLlitPrefix = codillit.substring(0,3);

        if (codiLlitPrefix == habitacioId.toString()) {
            return null;
        } else {
            return { codiLlitHabitacioMismatch: true };
        }
    }
}





