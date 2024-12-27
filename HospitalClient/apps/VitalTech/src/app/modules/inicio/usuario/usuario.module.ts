import { PacientesComponent } from '../../../../../../../libs/pages/pacientes/pacientes.component';
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdministradorSistemaDashboardComponent } from '../../../../../../GoldenFold/src/app/pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';
import { UsuarioComponent } from '../../../../../../../libs/pages/Usuario/usuario.component';
import { UsuariosRoutes } from './usuario-routing.module';

@NgModule({
  declarations: [UsuarioComponent],
  imports: [UsuariosRoutes, SharedModule, CommonModule, AdministradorSistemaDashboardComponent],
})
export class UsuarioModule {}
