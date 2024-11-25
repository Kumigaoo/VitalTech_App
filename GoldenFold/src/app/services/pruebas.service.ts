import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interface/medico.interface';
import { PruebaDiagnostica } from '../interface/pruebas-diagnosticas.interface';

@Injectable({
    providedIn: 'root'
  })

export class PruebasService {

  private apiUrl = 'http://localhost:5296/api/PruebasDiagnosticas';

  constructor(private http: HttpClient) { }

  getPruebasDiagnostricas(): Observable<PruebaDiagnostica[]> {
    return this.http.get<PruebaDiagnostica[]>(this.apiUrl);
  }

  getPruebaDiagnosticaId(id : number): Observable<PruebaDiagnostica> {
    return this.http.get<PruebaDiagnostica>(this.apiUrl+"/"+id);
  }

  postPruebaDiagnostica(medico : PruebaDiagnostica): Observable<PruebaDiagnostica> {
    return this.http.post<PruebaDiagnostica>(this.apiUrl,medico);
  }

  putPruebaDiagnostica(prueba : PruebaDiagnostica): Observable<PruebaDiagnostica> {
    const url = `${this.apiUrl}/${prueba.id}`;
    return this.http.put<PruebaDiagnostica>(url, prueba);
  }

  deletePruebaDiagnostica(id : number): Observable<PruebaDiagnostica> {
    return this.http.delete<PruebaDiagnostica>(`${this.apiUrl}/${id}`);
  }
}