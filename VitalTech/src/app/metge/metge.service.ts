import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Metge {
  dni: string;
  especialitat: string;
  nom: string;
  consultes: string[];
}

@Injectable({
  providedIn: 'root'
})

export class MetgeService {

  private apiUrl = 'http://localhost:5296/api/Personal';

  constructor(private http: HttpClient) { }

  getPersonal(): Observable<Metge[]> {
    return this.http.get<Metge[]>(this.apiUrl);
  }


 

}