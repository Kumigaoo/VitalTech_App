import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Administrativo } from '../interfaces/administrativo.interface';
import { BaseService } from './abstract-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministrativoService extends BaseService<
  Administrativo,
  string
> {
  protected apiUrl = 'https://localhost:7200/api/Administrativo';

  constructor(http: HttpClient) {
    super(http);
  }
}
