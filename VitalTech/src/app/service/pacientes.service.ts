import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pacient} from '../interface/pacient.interface'

@Injectable({
  providedIn: 'root'
})

export class PacientService {

  private apiUrl = 'http://localhost:5296/api/Pacient';

  constructor(private http: HttpClient) { }

  getPacients(): Observable<Pacient[]> {
    return this.http.get<Pacient[]>(this.apiUrl);
  }

  getPacientId(id : string): Observable<Pacient> {
    return this.http.get<Pacient>(this.apiUrl+"/"+id);
  }

  postPacient(pacient : Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(this.apiUrl,pacient);
  }

  putPacient(pacient : Pacient): Observable<Pacient> {
    const url = `${this.apiUrl}/${pacient.dni}`;
    return this.http.put<Pacient>(url, pacient);
  }

  deletePacient(id : string): Observable<Pacient> {
    return this.http.delete<Pacient>(`${this.apiUrl}/${id}`);
  }




}