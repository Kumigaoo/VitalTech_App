import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planta } from '../interface/planta.interface';


@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  private apiUrl = 'http://localhost:5296/api/Planta';

  constructor(private http: HttpClient) { }

  getPlantes(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.apiUrl);
  }


}