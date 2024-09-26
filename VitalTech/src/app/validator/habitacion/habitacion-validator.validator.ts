import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, FormGroup, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlantaService } from '../../service/planta.service';
import { HabitacioService } from '../../service/habitaciones.service';


export function habidValidator(habitacionService: HabitacioService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
          return of(null); 
        }

        return habitacionService.getHabitacio(control.value).pipe(
            map(hab => (hab ? { habIdExists: true } : null)), 
            catchError(() => of(null)) 
        );
    };
}

export function plantaidValidator(plantaService: PlantaService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
          return of(null); 
        }


        return plantaService.getPlanta(control.value).pipe(
            map(planta => (
                planta ? null : { plantaIdNotFound: true }
            )),
            catchError( error => {
                return of({ plantaIdNotFound: true });
            }

        ));
    };
}

export function codiHabitacioPlantaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        
        const habitacioId = formGroup.get('codiHabitacio')?.value;
        const plantaId = formGroup.get('plantaId')?.value;


        if(!plantaId || !habitacioId){
            return null;
        }


        const codiHabPrefix = habitacioId.substring(0,1);

        if (codiHabPrefix == habitacioId.toString()) {
            return null;
        } else {
            return { codiHabitacioPlantaMismatch: true };
        }
    }
}