import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingreso } from '../interface/ingreso.interface';

@Injectable({
    providedIn: 'root'
  })

export class IngresoService {
    private apiUrl = 'http://localhost:5076/api';

    constructor(private http: HttpClient) { }

    getIngresos(
        idPaciente?: number,
        idMedico?: number,
        estado?: string,
        tipoCama?: string 
      ): Observable<Ingreso[]> {
        let params = new HttpParams();
        if (idPaciente) params = params.set('idPaciente', idPaciente.toString());
        if (idMedico) params = params.set('idMedico', idMedico.toString());
        if (estado) params = params.set('estado', estado);
        if (tipoCama) params = params.set('tipoCama', tipoCama); 
        return this.http.get<Ingreso[]>(`${this.apiUrl}/Ingresos`, { params });
      }
    
      addIngreso(ingreso: Ingreso): Observable<Ingreso> {
        return this.http.post<Ingreso>(`${this.apiUrl}/Ingresos`, ingreso);
      }
    
      updateIngreso(ingreso: Ingreso): Observable<Ingreso> {
        return this.http.put<Ingreso>(
          `${this.apiUrl}/Ingresos/${ingreso.IdIngreso}`,
          ingreso
        );
      }
    
      deleteIngreso(idIngreso: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Ingresos/${idIngreso}`);
      }
}