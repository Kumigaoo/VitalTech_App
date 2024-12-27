import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-administratidor-sistema-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './administrador-sistema-dashboard.component.html',
  styleUrls: ['./administrador-sistema-dashboard.component.css'],
})
export class AdministradorSistemaDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    alert('Sesión cerrada');
    this.router.navigate(['/inicio']);
  }
}
