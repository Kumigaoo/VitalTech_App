import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CamasComponent } from '../../../../../../../libs/pages/Cama/camas.component';
import { ModifCamaComponent } from '../../../pages/inicio/pages/cama/pages/modif-cama/modif-cama.component';
import { RegistroCamaComponent } from '../../../pages/inicio/pages/cama/pages/registro-cama/registro-cama.component';

const routes: Routes = [
  {
    path: '',
    component: CamasComponent,
  },
  {
    path: 'modif-cama/:id',
    component: ModifCamaComponent,
  },
  {
    path: 'registro-cama',
    component: RegistroCamaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamaRoutes {}
