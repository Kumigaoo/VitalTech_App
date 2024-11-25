import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../interface/consulta.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private apiUrl = 'http://localhost:5296/api';

  constructor(private http: HttpClient) {}

  getConsultas(
    id?: number,
    urgencia?: string,
    sintomatologia?: string,
    recepta?: string,
    dniPersonal?: string,
    episodiMedicId?: number
    // idPaciente?: string,
    // estado?: string,
    // motivo?: string
  ): Observable<Consulta[]> {
    let params = new HttpParams();
    // if (idPaciente) params = params.set('idPaciente', idPaciente.toString());
    if (id) params = params.set('id', id.toString());
    if (dniPersonal) params = params.set('dniPersonal', dniPersonal.toString());
    if (episodiMedicId)
      params = params.set('episodiMedicId', episodiMedicId.toString());
    if (urgencia) params = params.set('urgencia', urgencia.toString());
    if (sintomatologia)
      params = params.set('sintomatologia', sintomatologia.toString());
    if (recepta) params = params.set('recepta', recepta.toString());


    
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  addConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/Consulta`, consulta);
  }

  updateConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(
      `${this.apiUrl}/Consulta/${consulta.id}`,
      consulta
    );
  }

  deleteConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Consulta/${id}`);
  }
}
