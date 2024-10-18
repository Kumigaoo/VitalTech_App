import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingreso } from '../interface/ingreso.interface';

@Injectable({
    providedIn: 'root'
  })

export class IngresoService {

  private apiUrl = 'http://localhost:5296/api/Ingres';

  constructor(private http: HttpClient) { }

  getIngresosos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(this.apiUrl);
  }

  getIngresoId(id : string): Observable<Ingreso> {
    return this.http.get<Ingreso>(this.apiUrl+"/"+id);
  }

  postIngreso(ingreso : Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso>(this.apiUrl,ingreso);
  }

  putIngreso(ingreso : Ingreso): Observable<Ingreso> {
    const url = `${this.apiUrl}/${ingreso.id}`;
    return this.http.put<Ingreso>(url, ingreso);
  }

  deleteIngreso(id : number): Observable<Ingreso> {
    return this.http.delete<Ingreso>(`${this.apiUrl}/${id}`);
  }
}