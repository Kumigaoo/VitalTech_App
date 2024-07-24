import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Pacient {
  id: number;
  numSS: string;
  nom: string;
  estat: string;
  sexe: string;
  consultes: string[];
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