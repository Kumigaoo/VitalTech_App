import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuari } from '../interface/usuari.interface';

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService {
    private apiUrl = 'http://localhost:5296/api/Usuari';

    constructor(private http: HttpClient) { }

    getUsuarios(): Observable<Usuari[]> {
      return this.http.get<Usuari[]>(this.apiUrl);
    }

    // getUsuarios(
    //     nombre?: string,
    //     nombreUsuario?: string,
    //     idRol?: number
    //   ): Observable<Usuari[]> {
    //     let params = new HttpParams();
    //     if (nombre) params = params.set('nombre', nombre);
    //     if (nombreUsuario) params = params.set('usuario', nombreUsuario);
    //     if (idRol) params = params.set('idRol', idRol.toString());
    //     return this.http.get<Usuari[]>(`${this.apiUrl}/Usuarios`, { params });
    //   }
    
      addUsuario(usuario: Usuari): Observable<Usuari> {
        return this.http.post<Usuari>(`${this.apiUrl}/`, usuario);
      }
    
      updateUsuario(usuario: Usuari, dni : string): Observable<Usuari> {
        return this.http.put<Usuari>(`${this.apiUrl}/${dni}`,
          usuario
        );
      }
      
      deleteUsuario(dni: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${dni}`);
      }
}