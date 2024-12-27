import { AdministradoresSistemaComponent } from './../../../../../../../libs/pages/AdministradorSistema/administradores-sistema.component';
import { PlantaComponent } from './../../../../../../../libs/pages/Planta/planta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorSistemaRoute } from './administrador-sistema-routing.module';
import { CamasComponent } from '../../../../../../../libs/pages/Cama/camas.component';
import { HabitacionesComponent } from '../../../../../../../libs/pages/Habitacion/habitaciones.component';
import { PacientesComponent } from '../../../../../../../libs/pages/pacientes/pacientes.component';
import { UsuarioComponent } from '../../../../../../../libs/pages/Usuario/usuario.component';
import { IngresosComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/ingresos/ingresos.component';
import { PruebasComponent } from '../../../../../../../libs/pages/Pruebas-diagnosticas/pruebas.component';
import { AdministradorSistemaDashboardComponent } from '../../../pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { AdministradorSistemaComponent } from '../../../pages/inicio/pages/administrador-sistema/administrador-sistema.component';
import { MetgesComponent } from '../../../../../../../libs/pages/Medico/metges.component';
import { EnfermersComponent } from '../../../../../../../libs/pages/Enfermero/enfermers.component';
import { EpisodiComponent } from '../../../../../../../libs/pages/Episodio/episodio-medico.component';

@NgModule({
  declarations: [
    AdministradorSistemaComponent,
    MetgesComponent,
    CamasComponent,
    AdministradoresSistemaComponent,
    EnfermersComponent,
    HabitacionesComponent,
    PacientesComponent,
    UsuarioComponent,
    IngresosComponent,
    PruebasComponent,
    PlantaComponent,
    EpisodiComponent
  ],

  imports: [
    AdministradorSistemaRoute,
    AdministradorSistemaDashboardComponent,
    SharedModule,
    CommonModule,
  ],
})
export class AdministradorSistemaModule {}
