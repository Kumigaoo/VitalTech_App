import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../interface/personal.interface';

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService {
    private apiUrl = 'http://localhost:5296/api/Personal';

    constructor(private http: HttpClient) { }

    getUsuarios(): Observable<Personal[]> {
      return this.http.get<Personal[]>(this.apiUrl);
    }

    // getUsuarios(
    //     nombre?: string,
    //     nombreUsuario?: string,
    //     idRol?: number
    //   ): Observable<Personal[]> {
    //     let params = new HttpParams();
    //     if (nombre) params = params.set('nombre', nombre);
    //     if (nombreUsuario) params = params.set('usuario', nombreUsuario);
    //     if (idRol) params = params.set('idRol', idRol.toString());
    //     return this.http.get<Personal[]>(`${this.apiUrl}/Usuarios`, { params });
    //   }
    
      addUsuario(usuario: Personal): Observable<Personal> {
        return this.http.post<Personal>(`${this.apiUrl}/`, usuario);
      }
    
      updateUsuario(usuario: Personal): Observable<Personal> {
        return this.http.put<Personal>(
          `${this.apiUrl}/Usuarios/${usuario.dni}`,
          usuario
        );
      }
      
      deleteUsuario(dni: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${dni}`);
      }

      // asi estaba antes:
      // deleteUsuario(idUsuario: number): Observable<void> {
      //   return this.http.delete<void>(`${this.apiUrl}/Usuarios/${idUsuario}`);
      // }

}