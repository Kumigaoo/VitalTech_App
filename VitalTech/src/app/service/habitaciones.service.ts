import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacio } from '../interface/habitacio.interface';

@Injectable({
  providedIn: 'root'
})

export class HabitacioService {

  private apiUrl = 'http://localhost:5296/api/Habitacio';

  constructor(private http: HttpClient) { }

  getHabitacions(): Observable<Habitacio[]> {
    return this.http.get<Habitacio[]>(this.apiUrl);
  }


 

}