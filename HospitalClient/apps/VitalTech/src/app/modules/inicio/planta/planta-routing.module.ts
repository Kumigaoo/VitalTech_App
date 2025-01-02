//import { ModifPlantaComponent } from './../../../pages/inicio/pages/planta/pages/modif-planta/modif-planta.component';
import { PlantaComponent } from './../../../../../../../libs/pages/Planta/planta.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DialogPlantaComponent } from '../../../../../../../libs/forms/Planta/dialog-planta-component';

const routes: Routes = [
  {
    path: '',
    component: PlantaComponent
  },{
      path: 'registro-planta',
      component: DialogPlantaComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantaRoutes {}
