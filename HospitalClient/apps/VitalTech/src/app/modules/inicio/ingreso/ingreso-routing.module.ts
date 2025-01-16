import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IngresosComponent } from '../../../../../../../libs/pages/Ingreso/ingresos.component';
import { ModifIngresoComponent } from '../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingreso.component';
import { RegistroIngresoComponent } from '../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component';

const routes: Routes = [
  {
    path: '',
    component: IngresosComponent,
  },
  {
    path: 'modif-ingreso/:id',
    component: ModifIngresoComponent,
  },
  {
    path: 'registro-ingreso',
    component: RegistroIngresoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoRoutes {}
