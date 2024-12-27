import { PacientesComponent } from '../../../../../../../libs/pages/pacientes/pacientes.component';
import { NgModule } from '@angular/core'
import { PacienteRoutes } from './paciente-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdministradorSistemaDashboardComponent } from '../../../../../../GoldenFold/src/app/pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';

@NgModule({
  declarations: [PacientesComponent],
  imports: [PacienteRoutes, SharedModule, CommonModule, AdministradorSistemaDashboardComponent],
})
export class PacienteModule {}
