import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CamasComponent } from './camas/camas.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';  
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './pacientes/pacientes.component';  
import { UsuarioComponent } from './usuario/usuario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { RegistroComponent } from './registro/registro.component';
import { FichaComponent } from './ficha/ficha.component';
import { ModificarPacienteComponent } from './modificar-paciente/modificar-paciente.component';
import { EpisodisComponent } from './episodis/episodis.component';

export const routes: Routes = [
    {path: '', redirectTo: '/pacientes', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'camas', component: CamasComponent},
    {path: 'habitaciones', component: HabitacionesComponent},
    {path: 'pacientes', component: PacientesComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'ficha', component: FichaComponent},
    {path: 'modificar-paciente', component: ModificarPacienteComponent},
    {path: 'episodis', component: EpisodisComponent}
];
