import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Llit } from '../interface/llit.interface';

@Injectable({
  providedIn: 'root'
})

export class CamasService {

  private apiUrl = 'https://localhost:7200/api/Llit';

  constructor(private http: HttpClient) { }

  getLlits(): Observable<Llit[]> {
    return this.http.get<Llit[]>(this.apiUrl);
  }

  getLlit(id:string): Observable<Llit> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Llit>(url);
  }

  deleteLlit(id:string): Observable<Llit> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Llit>(url);
  }
  
  putLlit(llit: Llit, codi: string): Observable<Llit> {
    // const url = `${this.apiUrl}/${llit.codiLlit}`;
    // return this.http.put<Llit>(url, llit);

    return this.http.put<Llit>(`${this.apiUrl}/${codi}`, llit);

  }
}