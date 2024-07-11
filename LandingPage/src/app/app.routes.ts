import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch:'full'},
    {path: 'inicio', component: InicioComponent },
    {path: 'nosotros', component: NosotrosComponent },
    {path: 'login', component: LoginComponent }
];
