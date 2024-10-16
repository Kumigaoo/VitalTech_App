import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interface/paciente.interface';

@Injectable({
    providedIn: 'root'
  })

export class PacienteService {
    private apiUrl = 'http://localhost:5076/api';

    constructor(private http: HttpClient) { }

    getPacientes(Nombre?: string, numSS?: string): Observable<Paciente[]> {
        let params = new HttpParams();
        if (Nombre) params = params.set('nombre', Nombre);
        if (numSS) params = params.set('numSS', numSS);
        return this.http.get<Paciente[]>(`${this.apiUrl}/Pacientes`, { params });
      }
    
      getPacienteById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/Pacientes/${id}`);
      }
      addPaciente(paciente: Paciente): Observable<Paciente> {
        return this.http.post<Paciente>(`${this.apiUrl}/Pacientes`, paciente);
      }
    
      updatePaciente(paciente: Paciente): Observable<Paciente> {
        return this.http.put<Paciente>(
          `${this.apiUrl}/Pacientes/${paciente.IdPaciente}`,
          paciente
        );
      }
    
      deletePaciente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Pacientes/${id}`);
      }
}