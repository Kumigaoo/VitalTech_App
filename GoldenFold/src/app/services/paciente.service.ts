import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interface/paciente.interface';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
    providedIn: 'root'
  })

export class PacienteService {

  private apiUrl = 'https://localhost:7200/api/Pacient';

  constructor(private http: HttpClient) { }

  getPacients(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.apiUrl);
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