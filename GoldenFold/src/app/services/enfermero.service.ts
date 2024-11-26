import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interface/medico.interface';
import { Enfermero } from '../interface/enfermer.interface';

@Injectable({
    providedIn: 'root'
  })

export class EnfermeroService {

  private apiUrl = 'https://localhost:7200/api/Enfermer';

  constructor(private http: HttpClient) { }

  getEnfermeros(): Observable<Enfermero[]> {
    return this.http.get<Enfermero[]>(this.apiUrl);
  }

  getEnfermeroId(id : string): Observable<Enfermero> {
    return this.http.get<Enfermero>(this.apiUrl+"/"+id);
  }

  postEnfermero(enfermero : Enfermero): Observable<Enfermero> {
    return this.http.post<Enfermero>(this.apiUrl,enfermero);
  }

  putEnfermero(enfermero : Enfermero,dni: string): Observable<Enfermero> {
    const url = `${this.apiUrl}/${dni}`;
    return this.http.put<Enfermero>(url, enfermero);
  }

  deleteEnfermero(id : string): Observable<Enfermero> {
    return this.http.delete<Enfermero>(`${this.apiUrl}/${id}`);
  }
}