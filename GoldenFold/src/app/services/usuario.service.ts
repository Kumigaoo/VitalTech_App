import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../interface/personal.interface';
import { Usuari } from '../interface/usuari.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = 'https://localhost:7200/api/Usuari';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuari[]> {
    return this.http.get<Usuari[]>(this.apiUrl);
  }

  addUsuario(usuario: Usuari): Observable<Usuari> {
    return this.http.post<Usuari>(`${this.apiUrl}/`, usuario);
  }

  updateUsuario(usuario: Usuari, dni: string): Observable<Usuari> {
    return this.http.put<Usuari>(`${this.apiUrl}/${dni}`, usuario);
  }

  deleteUsuario(dni: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dni}`);
  }
}
