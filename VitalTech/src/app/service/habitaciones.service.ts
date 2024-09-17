import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacio } from '../interface/habitacio.interface';

@Injectable({
  providedIn: 'root'
})

export class HabitacioService {

  private apiUrl = 'http://localhost:5296/api/Habitacio';

  constructor(private http: HttpClient) { }


  // GET
  getHabitacions(): Observable<Habitacio[]> {

    return this.http.get<Habitacio[]>(this.apiUrl);

  }

  // GET{id}
  getHabitacio(id: number): Observable<Habitacio> {

    let params = new HttpParams().set('id', id)

    return this.http.get<Habitacio>(`${this.apiUrl}/id`, { params });

  }

  // POST
  postHabitacio(habitacio: Habitacio): Observable<Habitacio> {

    return this.http.post<Habitacio>(this.apiUrl, habitacio);

  }

  // DELETE
  deleteHabitacio(id: number): Observable<Habitacio> {

    let params = new HttpParams().set('id', id)

    return this.http.delete<any>(this.apiUrl + '/id', { params });

  }

  // PUT
  putHabitcions(habitacio: Habitacio): Observable<Habitacio> {

    return this.http.put<Habitacio>(`${this.apiUrl}/${habitacio.codiHabitacio}`, habitacio);

  }

  // PATCH
  patchHabitcio(habitacio: Habitacio): Observable<Habitacio> {

    return this.http.patch<Habitacio>(`${this.apiUrl}/${habitacio.codiHabitacio}`, habitacio);

  }



}