import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface JsonPatchDocument {
  op: string;
  path: string;
  value?: any;
}

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

  updatePacient(dni: string, patchDoc: JsonPatchDocument[]): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${dni}`, patchDoc);
  }

 

}