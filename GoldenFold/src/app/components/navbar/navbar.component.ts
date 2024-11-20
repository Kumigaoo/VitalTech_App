import { Component, OnInit } from '@angular/core';
import {RouterLinkActive,RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  onLogout(): void {
    // Obtener el id_token almacenado en localStorage
    const idToken = localStorage.getItem('idToken');
    
    if (!idToken) {
      console.error("No ID token found. Redirecting to login.");
      this.router.navigate(['/inicio']);
      return;
    }
  
    // Limpiar los datos de autenticación del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('idToken');
  
    // URL de logout de Keycloak
    const logoutUrl = `https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/logout` +
                      `?id_token_hint=${encodeURIComponent(idToken)}` +
                      `&post_logout_redirect_uri=http://localhost:4201/inicio`;
  
    // Redirigir al usuario a la página de logout de Keycloak
    window.location.href = logoutUrl;
  }

}
