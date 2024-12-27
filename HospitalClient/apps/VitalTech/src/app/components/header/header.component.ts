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
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;
  nom: string = '';

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
<<<<<<< HEAD:VitalTech/src/app/components/header/header.component.ts
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        this.nom = userData?.name || '';

        // Guardar el nombre en la sesión
        // this.https.put('/set-session', { value: this.nom }).subscribe();

        const data = new Date();

        data.setTime(data.getTime() + 365 * 24 * 60 * 60 * 1000);

        const expires = `expires=${data.toUTCString()}`;

        document.cookie = "nomUser=" + this.nom + `; ${expires}; path=/login`;

      } else {

        this.nom = '';

      }
    });
=======
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData }) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.nom = userData?.name || '';

          // Guardar el nombre en la sesión
          this.https.post('/set-session', { value: this.nom }).subscribe();
        } else {
          this.nom = '';
        }
      });
>>>>>>> 603c325456e4078226ae091d6e572a416dcf4ae8:HospitalClient/apps/VitalTech/src/app/components/header/header.component.ts
  }

  onLogin(): void {
    this.oidcSecurityService.authorize();
  }

  getCookie(name: string): string {

    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {

      const [key, value] = cookie.split('=');

      if (key == name) {

        return value;

      }
    }

    return "Dont exist";

  }

  openDialog(): void {
<<<<<<< HEAD:VitalTech/src/app/components/header/header.component.ts

    this.dialog.open(PopUpLogoutComponent, {
      data: {
        nom: this.getCookie("nomUser")
      },
      width: "auto",
      height: "auto"
=======
    this.https.get<{ value: string }>('/set-session').subscribe((response) => {
      this.dialog.open(PopUpLogoutComponent, {
        data: { nom: response.value },
        width: 'auto',
        height: 'auto',
      });
>>>>>>> 603c325456e4078226ae091d6e572a416dcf4ae8:HospitalClient/apps/VitalTech/src/app/components/header/header.component.ts
    });
  }
}
