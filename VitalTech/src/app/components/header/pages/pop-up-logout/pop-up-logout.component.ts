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
  isAuthenticated = false;
  nom = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) 
  {

  }

  onLogout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

}
