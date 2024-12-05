import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EpisodiMedic } from '../interface/episodis-medics.interface';
import { BaseService } from '../../../../../libs/services/abstract-service.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodiService extends BaseService<EpisodiMedic, number> {
  protected apiUrl = 'https://localhost:7200/api/EpisodiMedic';

  constructor(http: HttpClient) {
    super(http);
  }
}
