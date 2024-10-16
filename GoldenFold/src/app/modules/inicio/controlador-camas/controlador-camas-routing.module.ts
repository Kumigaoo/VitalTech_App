import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarCamaComponent } from '../../../pages/inicio/pages/controlador-camas/pages/asignar-cama/asignar-cama.component';
import { EstadoCamasComponent } from '../../../pages/inicio/pages/controlador-camas/pages/estado-camas/estado-camas.component';
import { SolicitudesIngresoComponent } from '../../../pages/inicio/pages/controlador-camas/pages/solicitudes-ingreso/solicitudes-ingreso.component';
import { ControladorCamasComponent } from '../../../pages/inicio/pages/controlador-camas/controlador-camas.component';


const routes: Routes = [
  {
    path: '',
    component: ControladorCamasComponent
  },
  {
    path: 'asignar-cama',
    component: AsignarCamaComponent
  }, 
  {
    path:'estado-camas',
    component: EstadoCamasComponent
  }, 
  {
    path: 'solicitudes-ingreso',
    component: SolicitudesIngresoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControladorCamasRoute { }
