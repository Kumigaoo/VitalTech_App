import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interface/medico.interface';

@Injectable({
    providedIn: 'root'
  })

export class MedicoService {

  private apiUrl = 'http://localhost:5296/api/Metge';

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  getMedicoId(id : string): Observable<Medico> {
    return this.http.get<Medico>(this.apiUrl+"/"+id);
  }

  postMedico(medico : Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl,medico);
  }

  putMedico(medico : Medico,dni: string): Observable<Medico> {
    const url = `${this.apiUrl}/${dni}`;
    return this.http.put<Medico>(url, medico);
  }

  deleteMedico(id : string): Observable<Medico> {
    return this.http.delete<Medico>(`${this.apiUrl}/${id}`);
  }
}