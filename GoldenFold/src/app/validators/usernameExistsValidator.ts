// username-async-validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MedicoService } from '../services/metge.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsernameAsyncValidator {
    constructor(private medicoService: MedicoService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        if (!control.value) {
        return of(null); // No hay validación si no hay nada que validar
        }
        return this.medicoService.getMedicos().pipe(
            map((medicos) => {
                const usernameExists = medicos.some(
                    (medico) => medico.usuariId === control.value
                );

                return usernameExists ? { usernameTaken:true } : null;
            }),
            catchError(() => of(null))
        );
    }
}
