import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planta } from '../interface/planta.interface';


@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  private apiUrl = 'https://localhost:7200/api/Planta';

  constructor(private http: HttpClient) { }

  getPlantes(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.apiUrl);
  }

  getPlanta(id:number): Observable<Planta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Planta>(url);
  }

  postPlanta(planta : Planta): Observable<Planta> {
    return this.http.post<Planta>(this.apiUrl,planta);
  }

  deletePlanta(id:number): Observable<Planta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Planta>(url);
  }
  
  putPlanta(planta: Planta): Observable<Planta> {
    const url = `${this.apiUrl}/${planta.piso}`;
    return this.http.put<Planta>(url, planta);
  }



}