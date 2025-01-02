import { PacientesComponent } from '../../../../../../../libs/pages/pacientes/pacientes.component';
import { AdministrativoComponent } from '../../../../../../../libs/pages/administrativo/administrativo.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativoRoutes {}
