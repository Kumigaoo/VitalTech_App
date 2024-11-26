import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Metge } from '../interface/metge.interface'

@Injectable({
  providedIn: 'root'
})

export class MetgeService {

  private apiUrl = 'https://localhost:7200/api/Metge';

  constructor(private http: HttpClient) { }

  getPersonals(): Observable<Metge[]> {
    return this.http.get<Metge[]>(this.apiUrl);
  }

  getPersonalId(id: string): Observable<Metge> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Metge>(url);
  }

  postPersonal(metge: Metge): Observable<Metge> {
    return this.http.post<Metge>(this.apiUrl, metge);
  }

  putPacient(metge: Metge, dni: string): Observable<Metge> {
    return this.http.put<Metge>(`${this.apiUrl}/${dni}`, metge);
  }

  deletePacient(id: string): Observable<Metge> {
    return this.http.delete<Metge>(`${this.apiUrl}/${id}`);
  }


}