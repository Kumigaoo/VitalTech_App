import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-administrativo-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './administrativo-dashboard.component.html',
  styleUrls: ['./administrativo-dashboard.component.css'],
})
export class AdministrativoDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    alert('Sesión cerrada');
    this.router.navigate(['/inicio']);
  }
}
