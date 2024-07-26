import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Pacient {
  dni: string;
  numSS: string;
  nom: string;
  sexe: string;
  episodisMedics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  private apiUrl = 'http://localhost:5296/api/Pacient';

  constructor(private http: HttpClient) { }

  getPacients(): Observable<Pacient[]> {
    return this.http.get<Pacient[]>(this.apiUrl);
  }
}