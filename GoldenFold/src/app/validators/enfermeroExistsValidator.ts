// username-async-validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MedicoService } from '../services/metge.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EnfermeroService } from '../services/enfermero.service';

@Injectable({
  providedIn: 'root',
})
export class EnfermeroAsyncValidator {
    constructor(private enfermeroService: EnfermeroService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        if (!control.value) {
        return of(null); // No hay validación si no hay nada que validar
        }
        return this.enfermeroService.getEnfermeros().pipe(
            map((enfermeros) => {
                const usernameExists = enfermeros.some(
                    (enfermero) => enfermero.usuariId === control.value
                );

                return usernameExists ? { usernameTaken:true } : null;
            }),
            catchError(() => of(null))
        );
    }
}
