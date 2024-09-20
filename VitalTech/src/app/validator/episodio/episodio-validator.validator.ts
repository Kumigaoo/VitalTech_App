import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, FormGroup, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EpisodiService } from '../../service/episodis.service';

export function dataIniciFinalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        
        const dataObertura = formGroup.get('dataObertura')?.value;
        const dataTancament = formGroup.get('dataTancament')?.value;


        if(!dataObertura || !dataTancament){
            return null;
        }

        if (dataObertura > dataTancament) {
            return null;
        } else {
            return { viajealtemps: true };
        }
    }
}