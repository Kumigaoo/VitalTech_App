import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Llit } from '../../interface/llit.interface';

@Injectable({
  providedIn: 'root'
})

export class CamasService {

  private apiUrl = 'http://localhost:5296/api/Llit';

  constructor(private http: HttpClient) { }

  getLlits(): Observable<Llit[]> {
    return this.http.get<Llit[]>(this.apiUrl);
  }


 

}