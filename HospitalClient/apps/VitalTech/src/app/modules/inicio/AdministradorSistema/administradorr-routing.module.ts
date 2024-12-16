import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CamasComponent } from '../../../../../../../libs/pages/Cama/camas.component';
import { ModifCamaComponent } from '../../../pages/inicio/pages/cama/pages/modif-cama/modif-cama.component';
import { RegistroCamaComponent } from '../../../pages/inicio/pages/cama/pages/registro-cama/registro-cama.component';
import { AdministradoresSistemaComponent } from '../../../../../../../libs/pages/AdministradorSistema/administradores-sistema.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradoresSistemaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutes {}
