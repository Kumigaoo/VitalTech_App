import { PacientesComponent } from './../../../../../../../libs/pages/Paciente/pacientes.component';
import { NgModule } from '@angular/core'
import { PacienteRoutes } from './paciente-routing.module';
import { NavComponent } from '../../../components/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdministradorSistemaDashboardComponent } from '../../../../../../GoldenFold/src/app/pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';
@NgModule({
  declarations: [PacientesComponent],
  imports: [PacienteRoutes, SharedModule, CommonModule, AdministradorSistemaDashboardComponent],
})
export class PacienteModule {}
