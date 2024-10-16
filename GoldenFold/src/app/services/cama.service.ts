import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cama } from '../interface/cama.interface';

@Injectable({
    providedIn: 'root'
  })

export class CamaService {
    private apiUrl = 'http://localhost:5296/api/Llit';

    constructor(private http: HttpClient) { }

    getCamas(
        Ubicacion?: string,
        Estado?: string,
        Tipo?: string,
        IdHabitacion?: number,
        IdCama?: number
      ): Observable<Cama[]> {
        let params = new HttpParams();
        if (Ubicacion) params = params.set('ubicacion', Ubicacion);
        if (Estado) params = params.set('estado', Estado);
        if (Tipo) params = params.set('tipo', Tipo);
        if (IdHabitacion)
          params = params.set('idHabitacion', IdHabitacion.toString());
        if (IdCama) params = params.set('idCama', IdCama.toString());
        return this.http.get<Cama[]>(`${this.apiUrl}/Camas`, { params });
      }
}