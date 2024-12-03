import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
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
  private readonly https = inject(HttpClient);
  isAuthenticated = false;
  nom: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    this.nom = data.nom;

  }

  onLogout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => {
      console.log(result);

      // Limpiar la sesión al cerrar sesión
      document.cookie = `nomUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;`;
    });
  }
}