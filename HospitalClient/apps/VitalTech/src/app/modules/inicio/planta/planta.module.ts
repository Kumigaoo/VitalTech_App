import { PlantaComponent } from './../../../../../../../libs/pages/Planta/planta.component';
import { NgModule } from '@angular/core';
import { PlantaRoutes } from './planta-routing.module';
import { RegistroPlantaComponent } from '../../../pages/inicio/pages/planta/pages/registro-planta/registro-planta.component';
//import { ModifPlantaComponent } from '../../../pages/inicio/pages/planta/pages/modif-planta/modif-planta.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AdministradorSistemaDashboardComponent } from '../../../../../../GoldenFold/src/app/pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';

@NgModule({
  declarations: [
    PlantaComponent, RegistroPlantaComponent
  ],
  imports: [PlantaRoutes, SharedModule, CommonModule, AdministradorSistemaDashboardComponent],
})
export class PlantaModule {}
