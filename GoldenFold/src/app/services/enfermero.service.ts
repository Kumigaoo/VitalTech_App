import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interface/medico.interface';

@Injectable({
    providedIn: 'root'
  })

export class EnfermeroService {

  private apiUrl = 'http://localhost:5296/api/Enfermer';

  constructor(private http: HttpClient) { }

  getEnfermeros(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  getEnfermeroId(id : string): Observable<Medico> {
    return this.http.get<Medico>(this.apiUrl+"/"+id);
  }

  postEnfermero(medico : Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl,medico);
  }

  putEnfermero(medico : Medico,dni: string): Observable<Medico> {
    const url = `${this.apiUrl}/${dni}`;
    return this.http.put<Medico>(url, medico);
  }

  deleteEnfermero(id : string): Observable<Medico> {
    return this.http.delete<Medico>(`${this.apiUrl}/${id}`);
  }
}