import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingres } from '../interface/ingres.interface';

@Injectable({
  providedIn: 'root',
})
export class IngresService {
  private apiUrl = 'https://localhost:7200/api/Ingres';

  constructor(private http: HttpClient) {}

  getIngressos(): Observable<Ingres[]> {
    return this.http.get<Ingres[]>(this.apiUrl);
  }

  getIngresId(id: string): Observable<Ingres> {
    return this.http.get<Ingres>(this.apiUrl + '/' + id);
  }

  postIngres(ingres: Ingres): Observable<Ingres> {
    return this.http.post<Ingres>(this.apiUrl, ingres);
  }

  putIngres(ingres: Ingres): Observable<Ingres> {
    const url = `${this.apiUrl}/${ingres.id}`;
    return this.http.put<Ingres>(url, ingres);
  }

  deleteIngres(id: number): Observable<Ingres> {
    return this.http.delete<Ingres>(`${this.apiUrl}/${id}`);
  }
}
