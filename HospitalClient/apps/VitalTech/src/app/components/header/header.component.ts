import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { PopUpLogoutComponent } from './pages/pop-up-logout/pop-up-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly https = inject(HttpClient);
  isAuthenticated = false;
  nom: string = '';
 
  constructor(private router: Router, public dialog: MatDialog) {}
 
  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.isAuthenticated = isAuthenticated;
 
      if (isAuthenticated) {
        this.nom = userData?.name || '';
 
        const data = new Date();
 
        data.setTime(data.getTime() + 365 * 24 * 60 * 60 * 1000);
 
        const expires = `expires=${data.toUTCString()}`;
 
        document.cookie = "nomUser=" + this.nom + `; ${expires};`;
 
      } else {
 
        this.nom = '';
 
      }
    });
  }
 
  onLogin(): void {
    this.oidcSecurityService.authorize();
  }
 
  getCookie(name: string): string {
 
    const cookies = document.cookie.split(';');
 
    for (const cookie of cookies) {
 
      const [key, value] = cookie.split('=');
 
      if (key.trim() == name) {
 
        return value;
 
      }
    }
 
    return "Dont exist";
 
  }
 
  openDialog(): void {
 
    this.dialog.open(PopUpLogoutComponent, {
      data: {
        nom: this.getCookie("nomUser")
      },
      width: "30vw"
    });
  }
}