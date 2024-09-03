import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacio } from '../../interface/habitacio.interface';

@Injectable({
  providedIn: 'root'
})

export class HabitacioService {

  private apiUrl = 'http://localhost:5296/api/Habitacio';

  constructor(private http: HttpClient) { }

  // GET
  getHabitacions(): Observable<Habitacio[]> {

    return this.http.get<Habitacio[]>(this.apiUrl);
  
  }

  // GET{id}
  getHabitacio(id: number): Observable<any> {

    let params = new HttpParams().set('id', id)

    return this.http.get<Habitacio>(`${this.apiUrl}/id`, {params});

  }
 

}