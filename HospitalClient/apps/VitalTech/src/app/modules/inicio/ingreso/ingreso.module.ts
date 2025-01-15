import { NgModule } from '@angular/core';
import { IngresoRoutes } from './ingreso-routing.module';
import { IngresosComponent } from '../../../../../../../libs/pages/Ingreso/ingresos.component';
import { SharedModule } from '../../shared/shared.module';
import { RegistroIngresoComponent } from '../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component';
import { ModifIngresoComponent } from '../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingreso.component';
import { AdministradorSistemaDashboardComponent } from '../../../../../../GoldenFold/src/app/pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
    IngresosComponent,
    RegistroIngresoComponent,
    ModifIngresoComponent,
  ],
  imports: [IngresoRoutes, CommonModule, SharedModule, AdministradorSistemaDashboardComponent, MatPaginator],
})
export class IngresoModule {}
