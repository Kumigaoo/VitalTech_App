import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../interface/rol.interface';

@Injectable({
    providedIn: 'root'
  })

export class RoleService {
    private apiUrl = 'http://localhost:5296/api/Llit';

    constructor(private http: HttpClient) { }
    getRoles(NombreRol?: string): Observable<Rol[]> {
        let params = new HttpParams();
        if (NombreRol) {
          params = params.set('nombreRol', NombreRol);
        }
        return this.http.get<Rol[]>(`${this.apiUrl}/Roles`, { params });
      }
    
      getRolById(IdRol: number): Observable<Rol> {
        return this.http.get<Rol>(`${this.apiUrl}/Roles/${IdRol}`);
      }
    
      addRol(Rol: Rol): Observable<Rol> {
        return this.http.post<Rol>(`${this.apiUrl}/Roles`, Rol);
      }
    
      updateRol(Rol: Rol): Observable<Rol> {
        return this.http.put<Rol>(`${this.apiUrl}/Roles/${Rol.IdRol}`, Rol);
      }
    
      deleteRol(IdRol: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Roles/${IdRol}`);
      }
    }