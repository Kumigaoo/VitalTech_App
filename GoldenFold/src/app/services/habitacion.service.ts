import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../interface/habitacion.interface';

@Injectable({
    providedIn: 'root'
  })

export class HabitacionService {
    private apiUrl = 'http://localhost:5296/api/Llit';

    constructor(private http: HttpClient) { }

    getHabitaciones(
        Edificio?: string,
        Planta?: string,
        IdHabitacion?: number
      ): Observable<Habitacion[]> {
        let params = new HttpParams();
        if (Edificio) params = params.set('Edificio', Edificio);
        if (Planta) params = params.set('Planta', Planta);
        if (IdHabitacion)
          params = params.set('IdHabitacion', IdHabitacion.toString());
    
        return this.http.get<Habitacion[]>(`${this.apiUrl}/Habitaciones`, {
          params,
        });
      }
    
      addHabitacion(Habitacion: Habitacion): Observable<Habitacion> {
        return this.http.post<Habitacion>(
          `${this.apiUrl}/Habitaciones`,
          Habitacion
        );
      }
    
      updateHabitacion(Habitacion: Habitacion): Observable<Habitacion> {
        return this.http.put<Habitacion>(
          `${this.apiUrl}/Habitaciones/${Habitacion.IdHabitacion}`,
          Habitacion
        );
      }
    
      deleteHabitacion(IdHabitacion: number): Observable<void> {
        return this.http.delete<void>(
          `${this.apiUrl}/Habitaciones/${IdHabitacion}`
        );
      }
}