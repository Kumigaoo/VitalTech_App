import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planta } from '../interfaces/planta.interface';
import { BaseService } from './abstract-service.service';

@Injectable({
  providedIn: 'root',
})
export class PlantaService extends BaseService<Planta, string> {
  protected apiUrl = 'https://localhost:7200/api/Planta';

  constructor(http: HttpClient) {
    super(http);
  }
}
