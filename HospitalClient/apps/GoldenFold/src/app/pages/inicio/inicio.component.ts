import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthInterceptor, AuthModule } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {
  frontend2Url = environment.apiFrontVitaltech;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: View initialized');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: InicioComponent destroyed');
  }
}
