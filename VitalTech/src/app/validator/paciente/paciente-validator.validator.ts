import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, FormGroup, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PacientService} from '../../service/pacientes.service';


export function pacienteDniValidator(pacienteService: PacientService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if(!control.value){
            return of(null);
        }

        return pacienteService.getPacientId(control.value).pipe(
            map(pacient => (pacient? {pacientIdExistes: true } : null)),
            catchError(() => of(null))
        );
    };
}
export function pacienteDniLetraCorrect(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup= control as FormGroup;

        const dni = formGroup.get('dni')?.value;

        if(!dni){
            return null;
        }
        const abc: string[] = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N',
            'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
        const numDni = Number(dni.substring(0,8));
        const letra = dni.substring(dni.length-1).toUpperCase();

        const resto = numDni % 23;
        const letraCorrecta = abc[resto];

        if (letra === letraCorrecta) {
            return null;
        } else {
            return { dniLletraIncorrect: true};
        }
    }
}
