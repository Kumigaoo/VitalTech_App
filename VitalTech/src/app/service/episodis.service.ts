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

  getEpisodisId(id: number): Observable<EpisodiMedic> {
    return this.http.get<EpisodiMedic>(this.apiUrl + "/id?id=" + id);
  }

  postEpisodi(episodi: EpisodiMedic): Observable<EpisodiMedic> {
    return this.http.post<EpisodiMedic>(this.apiUrl, episodi);
  }

  putEpisodi(episodi: EpisodiMedic): Observable<EpisodiMedic> {
    const url = `${this.apiUrl}/id?id=${episodi.id}`;
    return this.http.put<EpisodiMedic>(url, episodi
    );
  }

  deleteEpisodi(id: string): Observable<EpisodiMedic> {
    return this.http.delete<EpisodiMedic>(`${this.apiUrl}/id?id=${id}`);
  }

 

}
