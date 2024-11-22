import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {RouterLinkActive,RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;
  nom = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => {
      this.isAuthenticated = isAuthenticated;
      console.log(isAuthenticated);
      console.log(userData);
      this.nom = userData.name;
    });
  }

  onLogin(): void {
    this.oidcSecurityService.authorize();
}

  onLogout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

}
