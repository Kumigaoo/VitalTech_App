import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../interface/habitacion.interface';

@Injectable({
  providedIn: 'root'
})

export class HabitacionService {
  private apiUrl = 'http://localhost:5296/api/habitacio';

  constructor(private http: HttpClient) { }

  getHabitacions(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }

  addHabitacion(Habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(
      `${this.apiUrl}/Habitaciones`,
      Habitacion
    );
  }

  // updateHabitacion(Habitacion: Habitacion): Observable<Habitacion> {
  //   return this.http.put<Habitacion>(
  //     `${this.apiUrl}/Habitaciones/${Habitacion.IdHabitacion}`,
  //     Habitacion
  //   );
  // }

  deleteHabitacion(IdHabitacion: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Habitaciones/${IdHabitacion}`
    );
  }
}