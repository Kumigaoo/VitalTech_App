import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacio, HabitacioNoLlit } from '../interface/habitacio.interface';

@Injectable({
  providedIn: 'root'
})

export class HabitacioService {

  private apiUrl = 'http://localhost:5296/api/Habitacio';

  constructor(private http: HttpClient) { }

  // Instancia de Habitacion
  habitacioModel(codiHabitacio: number,
    capacitatLlits: number,
    plantaId: number,
    llits: string[]):
    Habitacio {
    return {
      codiHabitacio,
      capacitatLlits,
      plantaId,
      llits
    };
  }

  // Instancia de Habitacion sense llits
  habitacioModelNoLlit(codiHabitacio: number,
    capacitatLlits: number,
    plantaId: number):
    HabitacioNoLlit {
    return {
      codiHabitacio,
      capacitatLlits,
      plantaId
    };
  }

  // GET
  getHabitacions(): Observable<Habitacio[]> {

    return this.http.get<Habitacio[]>(this.apiUrl);

  }

  // GET{id}
  getHabitacio(id: number): Observable<any> {

    let params = new HttpParams().set('id', id)

    return this.http.get<Habitacio>(`${this.apiUrl}/id`, { params });

  }

  // POST
  postHabitacio(habitacio: HabitacioNoLlit): Observable<any> {

    return this.http.post<Habitacio>(this.apiUrl, habitacio);

  }

  // DELETE
  deleteHabitacio(id: number): Observable<any> {

    let params = new HttpParams().set('id', id)

    return this.http.delete<any>(this.apiUrl, { params });

  }

  // PUT
  putHabitcions(id: number, habitacio: HabitacioNoLlit): Observable<Habitacio> {

    return this.http.put<Habitacio>(`${this.apiUrl}/${id}`, habitacio);

  }

  // PATCH
  patchHabitcio(id: number, habitacio: Habitacio): Observable<any> {

    return this.http.put<Habitacio>(`${this.apiUrl}/${id}`, habitacio);

  }



}