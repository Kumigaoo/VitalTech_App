import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControladorCamasRoute } from './controlador-camas-routing.module';
import { ControladorCamasDashboardComponent } from '../../../pages/inicio/pages/controlador-camas/controlador-camas-dashboard/controlador-camas-dashboard.component';
import { ControladorCamasComponent } from '../../../pages/inicio/pages/controlador-camas/controlador-camas.component';
import { AsignarCamaComponent } from '../../../pages/inicio/pages/controlador-camas/pages/asignar-cama/asignar-cama.component';
import { EstadoCamasComponent } from '../../../pages/inicio/pages/controlador-camas/pages/estado-camas/estado-camas.component';
import { SolicitudesIngresoComponent } from '../../../pages/inicio/pages/controlador-camas/pages/solicitudes-ingreso/solicitudes-ingreso.component';
import { SharedModule } from '../../shared/shared.module';
import { AdministrativoDashboardComponent } from "../../../pages/inicio/pages/administrativo/administrativo-dashboard/administrativo-dashboard.component";

@NgModule({
  declarations: 
    [ControladorCamasComponent, AsignarCamaComponent, EstadoCamasComponent, SolicitudesIngresoComponent],
  imports: [ControladorCamasRoute, ControladorCamasDashboardComponent, SharedModule, AdministrativoDashboardComponent]
})
export class ControladorCamasModule { }
