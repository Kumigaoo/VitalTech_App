import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cama } from '../interface/cama.interface';
import { BaseService } from '../../../../../libs/services/abstract-service.service';

@Injectable({
  providedIn: 'root',
})
export class CamaService extends BaseService<Cama, string> {
  protected apiUrl = 'https://localhost:7200/api/Llit';

  constructor(http: HttpClient) {
    super(http);
  }
}
