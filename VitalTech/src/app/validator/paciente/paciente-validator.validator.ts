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
            map(pacient => (pacient? {pacientIdExists: true } : null)),
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

export function pacienteSSLetrasNumValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup= control as FormGroup;

        const SS = formGroup.get('numSS')?.value;
        const nombre = formGroup.get('nom')?.value;
        

        if(!SS || !nombre){
            return of (null);
        }

        const regex = /^[A-Z]{4}[01][0-9]{6}00[0-9]$/;

        if(regex.test(SS)) {
            const letrasSS = SS.substring(0, 4).toUpperCase();

            const partes = nombre.split(' ');
            const fisrtApellido = partes.length > 1 ? partes[1].substring(0,2).toUpperCase() : '';
            const firstApellido2 =  partes.length > 2 ? partes[2].substring(0,2).toUpperCase() : '';

            if(fisrtApellido === letrasSS.substring(0,2) && firstApellido2 === letrasSS.substring(2,4)) {
            return of (null);
            } 
        } 
        return { SSLletraIncorrect: true};


    }
}
export function pacienteSSValidator(pacienteService: PacientService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if(!control.value){
            return of(null);
        }

        return pacienteService.getPacients().pipe(
            map(pacients => {
                const pacient = pacients.find(p =>p.numSS === control.value);
                return pacient ? {pacientSSExistes: true } : null;
            }),
            catchError(() => of(null))
        );
    };
}
export function pacienteDniValidatorModif(pacienteService: PacientService, dniOriginal: string): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if(!control.value || control.value === dniOriginal){
            return of(null);
        }

        return pacienteService.getPacientId(control.value).pipe(
            map(pacient => (pacient? {pacientIdExistes: true } : null)),
            catchError(() => of(null))
        );
    };
}
