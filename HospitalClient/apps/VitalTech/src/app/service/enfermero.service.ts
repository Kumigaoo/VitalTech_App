import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermer } from '../interface/enfermer.inferface';

@Injectable({
  providedIn: 'root',
})
export class EnfermeroService {
  private apiUrl = 'https://localhost:7200/api/Enfermer';

  constructor(private http: HttpClient) {}

  getPersonals(): Observable<Enfermer[]> {
    return this.http.get<Enfermer[]>(this.apiUrl);
  }

  getPersonalId(id: string): Observable<Enfermer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Enfermer>(url);
  }

  postPersonal(enfermer: Enfermer): Observable<Enfermer> {
    return this.http.post<Enfermer>(this.apiUrl, enfermer);
  }

  putPacient(enfermer: Enfermer, dni: string): Observable<Enfermer> {
    return this.http.put<Enfermer>(`${this.apiUrl}/${dni}`, enfermer);
  }

  deletePacient(id: string): Observable<Enfermer> {
    return this.http.delete<Enfermer>(`${this.apiUrl}/${id}`);
  }
}
