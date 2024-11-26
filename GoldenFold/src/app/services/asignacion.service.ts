import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignacion } from '../interface/asignacion.interface';

@Injectable({
  providedIn: 'root',
})
export class AsignacionService {
  private apiUrl = 'http://localhost:5296/api/Llit';

  constructor(private http: HttpClient) {}

  getAsignaciones(
    idPaciente?: number,
    idCama?: number,
    fechaAsignacion?: Date,
    fechaLiberacion?: Date | null,
    asignadoPor?: number
  ): Observable<Asignacion[]> {
    let params = new HttpParams();

    if (idPaciente) params = params.set('idPaciente', idPaciente.toString());
    if (idCama) params = params.set('idCama', idCama.toString());
    if (fechaAsignacion)
      params = params.set('fechaAsignacion', fechaAsignacion.toISOString());
    if (fechaLiberacion)
      params = params.set('fechaLiberacion', fechaLiberacion.toISOString());
    if (asignadoPor) params = params.set('asignadoPor', asignadoPor.toString());

    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Asignacion[]>(`${this.apiUrl}/Asignaciones`, { headers });
  }

  addAsignacion(asignacion: Asignacion): Observable<Asignacion> {
    return this.http.post<Asignacion>(
      `${this.apiUrl}/Asignaciones`,
      asignacion
    );
  }

  updateAsignacion(asignacion: Asignacion): Observable<Asignacion> {
    return this.http.put<Asignacion>(
      `${this.apiUrl}/Asignaciones/${asignacion.IdAsignacion}`,
      asignacion
    );
  }

  deleteAsignacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Asignaciones/${id}`);
  }
}
