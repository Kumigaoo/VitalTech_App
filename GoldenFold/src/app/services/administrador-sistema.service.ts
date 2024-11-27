import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interface/medico.interface';
import { Enfermero } from '../interface/enfermer.interface';
import { AdministradorSistema } from '../interface/administrador-sistema.interface';

@Injectable({
    providedIn: 'root'
  })

export class AdministradorSistemaService {

  private apiUrl = 'https://localhost:7200/api/AdministradorSistema';

  constructor(private http: HttpClient) { }

  getAdministradores(): Observable<AdministradorSistema[]> {
    return this.http.get<AdministradorSistema[]>(this.apiUrl);
  }

  getAdministradorSistemaId(id : string): Observable<AdministradorSistema> {
    return this.http.get<AdministradorSistema>(this.apiUrl+"/"+id);
  }

  postAdministradorSistema(administradorSistema : AdministradorSistema): Observable<AdministradorSistema> {
    return this.http.post<AdministradorSistema>(this.apiUrl,administradorSistema);
  }

  putAdministradorSistema(administradorSistema : AdministradorSistema,dni: string): Observable<AdministradorSistema> {
    const url = `${this.apiUrl}/${dni}`;
    return this.http.put<AdministradorSistema>(url, administradorSistema);
  }

  deleteAdministradorSistema(id : string): Observable<AdministradorSistema> {
    return this.http.delete<AdministradorSistema>(`${this.apiUrl}/${id}`);
  }

  verificarDni(id : string): Observable<AdministradorSistema> {
    return this.http.get<AdministradorSistema>(this.apiUrl+"/"+id);
  }
}