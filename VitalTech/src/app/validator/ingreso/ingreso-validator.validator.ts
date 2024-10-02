import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, FormGroup, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EpisodiService } from '../../service/episodis.service';
import { CamasService } from '../../service/camas.service';
import { IngresService } from '../../service/ingres.service';

export function dataIniciFinalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        
        const dataEntrada = formGroup.get('dataEntrada')?.value;
        const dataSortida = formGroup.get('dataSortida')?.value;


        if(!dataEntrada || !dataSortida){
            return null;
        }

        if (new Date(dataEntrada) > new Date(dataSortida)) {
            return {viatjeEnElTemps: true};
        } else if (new Date(dataEntrada) > new Date()){
            return {viatjeEnElTemps: true};
        } else {
            return null;
        }
    }
}
export function dataIniciValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        
        const dataEntrada = formGroup.get('dataEntrada')?.value;

        if(!dataEntrada){
            return null;
        }

        if (new Date(dataEntrada) > new Date()){
            return {viatjeEnElTemps: true};
        } else {
            return null;
        }
    }
}

export function episodioidexists(episodiService: EpisodiService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
          return of(null); 
        }


        return episodiService.getEpisodisId(control.value).pipe(
            map(episodio => (
                episodio ? null : { episodioIdNotFound: true }
            )),
            catchError( error => {
                return of({ episodioIdNotFound: true });
            }

        ));
    };
}

export function llitIdexists(llitService: CamasService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
          return of(null); 
        }


        return llitService.getLlit(control.value).pipe(
            map(llit => (
                llit ? null : { llitIdNotFound: true }
            )),
            catchError( error => {
                return of({ llitIdNotFound: true });
            }

        ));
    };
}

export function ingresoEnCama(ingresService: IngresService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const formGroup = control as FormGroup;

      const codiLlit = formGroup.get('llitId')?.value;


      if(!codiLlit){
        return of(null);
      }

      return ingresService.getIngressos().pipe(
        map(ingresos => {
            const ingresosRelacionados = ingresos.filter(ingreso => ingreso.llitId === codiLlit);
            return ingresosRelacionados.length > 0 ? { camaOcupadaPaciente: true } : null;

        }),
        catchError(err => {
            return of(null);
        })
      )
    }

}

export function ingresoEnCamaModif(ingresService: IngresService, originalCamaId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      const codiLlit = control.value;

      if(!codiLlit || codiLlit ===originalCamaId){
        return of(null);
      }

      return ingresService.getIngressos().pipe(
        map(ingresos => {
            const ingresosRelacionados = ingresos.filter(ingreso => ingreso.llitId === codiLlit);
            return ingresosRelacionados.length > 0 ? { camaOcupadaPaciente: true } : null;

        }),
        catchError(err => {
            return of(null);
        })
      )
    }

}