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

  // Eliminar el token de localStorage y redirigir al login
  onLogout(): void {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
    localStorage.removeItem('accesToken'); // Elimina el token de localStorage
    this.router.navigate(['/login']); // Redirige al login (o al inicio)
  }

}
