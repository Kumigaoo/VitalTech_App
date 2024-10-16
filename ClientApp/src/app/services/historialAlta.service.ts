import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialAlta } from '../interface/historial-alta.interface';

@Injectable({
    providedIn: 'root'
  })

export class HistorialAltaService {
    private apiUrl = 'http://localhost:5296/api/Llit';

    constructor(private http: HttpClient) { }

    getHistorialAltas(
        idPaciente?: number,
        fechaAlta?: Date,
        diagnostico?: string,
        tratamiento?: string
      ): Observable<HistorialAlta[]> {
        let params = new HttpParams();
        if (idPaciente) params = params.set('idPaciente', idPaciente.toString());
        if (fechaAlta) params = params.set('fechaAlta', fechaAlta.toISOString());
        if (diagnostico) params = params.set('diagnostico', diagnostico);
        if (tratamiento) params = params.set('tratamiento', tratamiento);
    
        return this.http.get<HistorialAlta[]>(`${this.apiUrl}/HistorialAltas`, {
          params,
        });
      }
    
      addHistorialAlta(historialAlta: HistorialAlta): Observable<HistorialAlta> {
        return this.http.post<HistorialAlta>(
          `${this.apiUrl}/HistorialAltas`,
          historialAlta
        );
      }
    
      updateHistorialAlta(historialAlta: HistorialAlta): Observable<HistorialAlta> {
        return this.http.put<HistorialAlta>(
          `${this.apiUrl}/HistorialAltas/${historialAlta.IdHistorial}`,
          historialAlta
        );
      }
    
      deleteHistorialAlta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/HistorialAltas/${id}`);
      }
}