import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../interface/medico.interface';
import { Enfermero } from '../interface/enfermer.interface';
import { BaseService } from '../../../../../libs/services/abstract-service.service';

@Injectable({
  providedIn: 'root',
})
export class EnfermeroService extends BaseService<Enfermero, string> {
  protected apiUrl = 'https://localhost:7200/api/Enfermer';

  constructor(http: HttpClient) {
    super(http);
  }
}
