import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CamasComponent } from './camas/camas.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';  
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './pacientes/pacientes.component';  
import { UsuarioComponent } from './usuario/usuario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'camas', component: CamasComponent},
    {path: 'habitaciones', component: HabitacionesComponent},
    {path: 'pacientes', component: PacientesComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'configuracion', component: ConfiguracionComponent}

];
