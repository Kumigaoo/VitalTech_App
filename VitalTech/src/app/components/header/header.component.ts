import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { PopUpLogoutComponent } from './pages/pop-up-logout/pop-up-logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;
  nom = '';

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.nom = userData.name;
      } else {
        this.nom = '';
      }
    });
  }

  onLogin(): void {
    this.oidcSecurityService.authorize();
}

  openDialog(): void
  {
  this.dialog.open(PopUpLogoutComponent, {
      data: {},
      width: "auto",
      height: "auto"
    })

  }

  onLogout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

}
