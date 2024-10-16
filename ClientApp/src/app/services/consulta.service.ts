import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../interface/consulta.interface';

@Injectable({
    providedIn: 'root'
  })

export class ConsultaService {
    private apiUrl = 'http://localhost:5076/api';

    constructor(private http: HttpClient) { }

    getConsultas(
        idPaciente?: number,
        idMedico?: number,
        estado?: string,
        fechaSolicitud?: Date,
        fechaConsulta?: Date,
        motivo?: string
      ): Observable<Consulta[]> {
        let params = new HttpParams();
        if (idPaciente) params = params.set('idPaciente', idPaciente.toString());
        if (idMedico) params = params.set('idMedico', idMedico.toString());
        if (estado) params = params.set('estado', estado);
        if (fechaSolicitud)
          params = params.set('fechaSolicitud', fechaSolicitud.toISOString());
        if (fechaConsulta)
          params = params.set('fechaConsulta', fechaConsulta.toISOString());
        if (motivo) params = params.set('motivo', motivo);
    
        return this.http.get<Consulta[]>(`${this.apiUrl}/Consultas`, { params });
      }
    
      addConsulta(consulta: Consulta): Observable<Consulta> {
        return this.http.post<Consulta>(`${this.apiUrl}/Consultas`, consulta);
      }
    
      updateConsulta(consulta: Consulta): Observable<Consulta> {
        return this.http.put<Consulta>(
          `${this.apiUrl}/Consultas/${consulta.IdConsulta}`,
          consulta
        );
      }
    
      deleteConsulta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Consultas/${id}`);
      }
}