import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingres } from '../interface/ingres.interface';

@Injectable({
  providedIn: 'root'
})

export class IngresService {

  private apiUrl = 'http://localhost:5296/api/Ingres';

  constructor(private http: HttpClient) { }

  getIngressos(): Observable<Ingres[]> {
    return this.http.get<Ingres[]>(this.apiUrl);
  }


 

}