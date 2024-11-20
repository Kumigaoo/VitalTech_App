import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interface/paciente.interface';

@Injectable({
    providedIn: 'root'
  })

export class PacienteService {
  private apiUrl = 'http://localhost:5296/api/Pacient';

  constructor(private http: HttpClient) { }

  getPacients(): Observable<Paciente[]> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente[]>(this.apiUrl, { headers });
  }

  getPacientId(id : string): Observable<Paciente> {
    return this.http.get<Paciente>(this.apiUrl+"/"+id);
  }

  postPacient(pacient : Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl,pacient);
  }

  putPacient(pacient : Paciente, dni: string): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${dni}`, pacient);
  }

  deletePacient(id : string): Observable<Paciente> {
    return this.http.delete<Paciente>(`${this.apiUrl}/${id}`);
  }
}