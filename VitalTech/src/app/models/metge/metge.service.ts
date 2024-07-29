import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Metge} from '../../interface/metge.interface'

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