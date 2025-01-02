import {AdministrativoComponent } from '../../../../../../../libs/pages/administrativo/administrativo.component';
import { NgModule } from '@angular/core'
import { AdministrativoRoutes } from './administrativo-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdministradorSistemaDashboardComponent } from '../../../../../../GoldenFold/src/app/pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';

@NgModule({
  declarations: [AdministrativoComponent],
  imports: [AdministrativoRoutes, SharedModule, CommonModule, AdministradorSistemaDashboardComponent],
})
export class AdministrativoModule {}
