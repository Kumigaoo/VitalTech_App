import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cons, Observable } from 'rxjs';
import { PruebasDiagnosticas } from '../interface/pruebas-diagnosticas.interface';

@Injectable({
  providedIn: 'root',
})
export class PruebasDiagnosticasService {
  private apiUrl = 'https://localhost:7200/api/PruebasDiagnosticas';

  constructor(private http: HttpClient) {}

  getConsultes(): Observable<PruebasDiagnosticas[]> {
    return this.http.get<PruebasDiagnosticas[]>(this.apiUrl);
  }

  getConsulta(id: number): Observable<PruebasDiagnosticas> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PruebasDiagnosticas>(url);
  }

  deleteConsulta(id: number): Observable<PruebasDiagnosticas> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<PruebasDiagnosticas>(url);
  }

  putConsulta(consulta: PruebasDiagnosticas): Observable<PruebasDiagnosticas> {
    const url = `${this.apiUrl}/${consulta.id}`;
    return this.http.put<PruebasDiagnosticas>(url, consulta);
  }
}
