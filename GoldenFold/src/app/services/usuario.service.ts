import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService {
    private apiUrl = 'http://localhost:5296/api/Llit';

    constructor(private http: HttpClient) { }

    getUsuarios(
        nombre?: string,
        nombreUsuario?: string,
        idRol?: number
      ): Observable<Usuario[]> {
        let params = new HttpParams();
        if (nombre) params = params.set('nombre', nombre);
        if (nombreUsuario) params = params.set('usuario', nombreUsuario);
        if (idRol) params = params.set('idRol', idRol.toString());
        return this.http.get<Usuario[]>(`${this.apiUrl}/Usuarios`, { params });
      }
    
      addUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/Usuarios`, usuario);
      }
    
      updateUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(
          `${this.apiUrl}/Usuarios/${usuario.IdUsuario}`,
          usuario
        );
      }
    
      deleteUsuario(idUsuario: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Usuarios/${idUsuario}`);
      }
}