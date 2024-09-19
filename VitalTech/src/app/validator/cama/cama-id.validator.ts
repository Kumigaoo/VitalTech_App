import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CamasService } from '../../service/camas.service';


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