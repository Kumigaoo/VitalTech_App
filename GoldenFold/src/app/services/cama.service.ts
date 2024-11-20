import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cama } from '../interface/cama.interface';

@Injectable({
    providedIn: 'root'
  })

export class CamaService {
    private apiUrl = 'http://localhost:5296/api/Llit';

    constructor(private http: HttpClient) { }

    
    getLlits(): Observable<Cama[]> {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No token found!');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
      return this.http.get<Cama[]>(this.apiUrl, { headers });
    }

    getLlit(id:string): Observable<Cama> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Cama>(url);
    }

    deleteLlit(id:string): Observable<Cama> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<Cama>(url);
    }
  
    putLlit(llit: Cama): Observable<Cama> {
      const url = `${this.apiUrl}/${llit.codiLlit}`;
      return this.http.put<Cama>(url, llit);
    }
    /*
    getCamas(
        Ubicacion?: string,
        Estado?: string,
        Tipo?: string,
        IdHabitacion?: number,
        IdCama?: number
      ): Observable<Cama[]> {
        let params = new HttpParams();
        if (Ubicacion) params = params.set('ubicacion', Ubicacion);
        if (Estado) params = params.set('estado', Estado);
        if (Tipo) params = params.set('tipo', Tipo);
        if (IdHabitacion)
          params = params.set('idHabitacion', IdHabitacion.toString());
        if (IdCama) params = params.set('idCama', IdCama.toString());
        return this.http.get<Cama[]>(`${this.apiUrl}/Camas`, { params });
      }*/
}