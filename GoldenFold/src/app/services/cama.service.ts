import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cama } from '../interface/cama.interface';

@Injectable({
    providedIn: 'root'
  })

export class CamaService {
  
    private apiUrl = 'https://localhost:7200/api/Llit';

    constructor(private http: HttpClient) { }

    
    getLlits(): Observable<Cama[]> {
      return this.http.get<Cama[]>(this.apiUrl);
    }

    getLlit(id:string): Observable<Cama> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Cama>(url);
    }

    deleteLlit(id:string): Observable<Cama> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<Cama>(url);
    }
  
    putLlit(codiLlit: string, llit: Cama): Observable<Cama> {
      console.log(codiLlit, llit);
      return this.http.put<Cama>(`${this.apiUrl}/${codiLlit}`, llit);
    }
    
}