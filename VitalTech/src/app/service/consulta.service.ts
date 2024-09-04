import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cons, Observable } from 'rxjs';
import { Consulta } from '../interface/consulta.interface';


@Injectable({
  providedIn: 'root'
})

export class ConsultaService {

  private apiUrl = 'http://localhost:5296/api/Consulta';
  
  constructor(private http: HttpClient) { }

  getConsultes(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  getConsulta(id:number): Observable<Consulta> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Consulta>(url);
  }

}