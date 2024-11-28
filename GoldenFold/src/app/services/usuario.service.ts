import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../interface/personal.interface';
import { Usuari } from '../interface/usuari.interface';
import { BaseService } from './abstract-service.service';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService extends BaseService<Usuari, string> {
  protected apiUrl = 'https://localhost:7200/api/Usuari';

  constructor(http: HttpClient) {
    super(http);
  }
}
