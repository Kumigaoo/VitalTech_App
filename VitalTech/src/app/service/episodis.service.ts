import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EpisodiMedic } from '../interface/episodis-medics.interface';


@Injectable({
  providedIn: 'root'
})

export class EpisodiService {

  private apiUrl = 'http://localhost:5296/api/EpisodiMedic';

  constructor(private http: HttpClient) { }

  getEpisodis(): Observable<EpisodiMedic[]> {
    return this.http.get<EpisodiMedic[]>(this.apiUrl);
  }


 

}