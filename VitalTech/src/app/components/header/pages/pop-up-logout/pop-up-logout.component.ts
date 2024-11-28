import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-pop-up-logout',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-logout.component.html',
  styleUrl: './pop-up-logout.component.css'
})
export class PopUpLogoutComponent {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly http = inject(HttpClient);
  isAuthenticated = false;
  nom = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.nom = userData.name;
        // Guardar el nombre en la sesión
        this.http.post('/set-session', { value: this.nom }).subscribe();
      } else {
        this.nom = '';
      }
    });
  }

  onLogout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => {
      console.log(result);
      // Limpiar la sesión al cerrar sesión
      this.http.post('/set-session', { value: '' }).subscribe();
    });
  }
}