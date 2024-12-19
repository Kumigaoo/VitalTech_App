import { PlantaService } from './../services/planta.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, debounceTime, map, Observable, of, switchMap } from "rxjs";
import { Planta } from '../interfaces/planta.interface';

export function plantaExistsValidator(
  plantaService: PlantaService, //servicio para obtener todas las plantas
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => { //signatura que indica que devolvera o un error de Validación o null
    return plantaService.getAll().pipe( //hacemos un pipe de todas las plantas
        map((plantas: Planta[])=>{ //ponemos todas las plantas es una array
            const plantaExiste = plantas.some((planta) => planta.piso == control.value); //verificamos si el piso ya existe en la base de datos iterando por cada planta
            return plantaExiste ? { pisoExiste : true } : null; //si el piso existe devolvemos el error plantaExiste
        })
    )
  };
}