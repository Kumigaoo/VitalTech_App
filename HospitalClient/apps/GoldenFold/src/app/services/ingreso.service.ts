import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingreso } from '../interface/ingreso.interface';
import { BaseService } from '../../../../../libs/services/abstract-service.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoService extends BaseService<Ingreso, number> {
  protected apiUrl = 'https://localhost:7200/api/Ingres';

  constructor(http: HttpClient) {
    super(http);
  }
}
