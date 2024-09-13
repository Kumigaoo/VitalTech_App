import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { InicioComponent } from './common/inicio/inicio.component';
import { CamasComponent } from './models/camas/camas.component';
import { HabitacionesComponent } from './models/habitaciones/habitaciones.component';  
import { LoginComponent } from './formularis/login/login.component';
import { PacientesComponent } from './models/pacientes/pacientes.component';  
import { ConfiguracionComponent } from './common/configuracion/configuracion.component';
import { RegistroComponent } from './formularis/registro-paciente/registro.component';
import { EpisodisComponent } from './models/episodis/episodis.component';
import { ConsultaComponent } from './models/consulta/consulta.component';
import { MetgeComponent } from './models/metge/metge.component';
import { IngresComponent } from './models/ingres/ingres.component';
import { PlantaComponent } from './models/planta/planta.component';
import { RegistroConsultaComponent } from './formularis/registro-consulta/registro-consulta.component';
import { ModifConsultaComponent } from './formularis/modif-consulta/modif-consulta.component';
import { ModifPlantaComponent } from './formularis/modif-planta/modif-planta.component';
import { RegistroPlantaComponent } from './formularis/registro-planta/registro-planta.component';
import { ModifPacienteComponent } from './formularis/modif-paciente/modif-paciente.component';
import { ModifEpisodiComponent } from './formularis/modif-episodi/modif-episodi.component';
import { AgregarHabitacionesComponent } from './formularis/agregar-habitaciones/agregar-habitaciones.component';
import { RegistroEpisodiComponent } from './formularis/registro-episodi/registro-episodi.component';
import { RegistrarPersonalComponent } from './formularis/registrar-personal/registrar-personal.component';
import { ModifPersonalComponent } from './formularis/modif-personal/modif-personal.component';
import { ActualitzarHabitacionesComponent } from './formularis/actualitzar-habitaciones/actualitzar-habitaciones.component';
import { RegistroIngresComponent } from './formularis/registro-ingres/registro-ingres.component';
import { ModifIngresComponent } from './formularis/modif-ingres/modif-ingres.component';
import { ModifLlitComponent } from './formularis/modif-llit/modif-llit.component';
import { RegistroLlitComponent } from './formularis/registro-llit/registro-llit.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'camas', component: CamasComponent},
    {path: 'habitaciones', component: HabitacionesComponent},
    {path: 'habitaciones/agregar', component: AgregarHabitacionesComponent},
    {path: 'agregar-habitaciones/:id', component: ActualitzarHabitacionesComponent},
    {path: 'pacientes', component: PacientesComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'episodis', component: EpisodisComponent},
    {path: 'consulta', component: ConsultaComponent},
    {path: 'metge', component: MetgeComponent},
    {path: 'ingres', component: IngresComponent},
    {path: 'planta', component: PlantaComponent},
    {path: 'registro-consulta', component: RegistroConsultaComponent },
    {path: 'registro-ingres', component: RegistroIngresComponent },
    {path: 'registro-episodi', component: RegistroEpisodiComponent },
    {path: 'modif-consulta', component: ModifConsultaComponent},
    {path: 'modif-consulta/:id', component: ModifConsultaComponent },
    {path: 'modif-ingres/:id', component: ModifIngresComponent },
    {path: 'modif-ingres', component: ModifIngresComponent },
    {path: 'modif-planta', component: ModifPlantaComponent},
    {path: 'modif-planta/:id', component: ModifPlantaComponent},
    {path: 'registro-planta', component: RegistroPlantaComponent},
    {path: 'habitaciones/actualizar/:id', component : ActualitzarHabitacionesComponent},
    {path: 'modif-paciente', component: ModifPacienteComponent },
    {path: 'modif-episodi', component: ModifEpisodiComponent },
    {path: 'modif-episodi/:id', component: ModifEpisodiComponent },
    {path: 'modif-paciente/:id', component: ModifPacienteComponent},
    {path: 'registro-ingres', component: RegistroIngresComponent},
    {path: 'modif-ingres', component: ModifIngresComponent},
    {path: 'modif-ingres/:id', component: ModifIngresComponent},
    {path: 'registrar-personal',component: RegistrarPersonalComponent},
    {path: 'modif-personal/:id', component: ModifPersonalComponent},
    {path: 'modif-llit/:id', component: ModifLlitComponent },
    {path: 'registro-llit', component: RegistroLlitComponent}
];

