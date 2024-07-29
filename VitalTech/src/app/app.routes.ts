import { Routes } from '@angular/router';
import { InicioComponent } from './common/inicio/inicio.component';
import { CamasComponent } from './models/camas/camas.component';
import { HabitacionesComponent } from './models/habitaciones/habitaciones.component';  
import { LoginComponent } from './formularis/login/login.component';
import { PacientesComponent } from './models/pacientes/pacientes.component';  
import { ConfiguracionComponent } from './common/configuracion/configuracion.component';
import { RegistroComponent } from './formularis/registro/registro.component';
import { EpisodisComponent } from './models/episodis/episodis.component';
import { ConsultaComponent } from './models/consulta/consulta.component';
import { MetgeComponent } from './models/metge/metge.component';
import { IngresComponent } from './models/ingres/ingres.component';
import { PlantaComponent } from './models/planta/planta.component';

export const routes: Routes = [
    {path: '', redirectTo: '/pacientes', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'camas', component: CamasComponent},
    {path: 'habitaciones', component: HabitacionesComponent},
    {path: 'pacientes', component: PacientesComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'episodis', component: EpisodisComponent},
    {path: 'consultes', component: ConsultaComponent},
    {path: 'metge', component: MetgeComponent},
    {path: 'ingres', component: IngresComponent},
    {path: 'planta', component: PlantaComponent}
    
];
