import { NgModule } from '@angular/core';
import { HabitacionComponent } from '../../../pages/inicio/pages/habitacion/habitacion.component';
import { HabitacionRoutes } from './habitacion-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RegistroHabitacionComponent } from '../../../pages/inicio/pages/habitacion/pages/registro-habitacion/registro-habitacion.component';
import { ModifHabitacionComponent } from '../../../pages/inicio/pages/habitacion/pages/modif-habitacion/modif-habitacion.component';

@NgModule({
  declarations: [
    HabitacionComponent,
    RegistroHabitacionComponent,
    ModifHabitacionComponent,
  ],
  imports: [HabitacionRoutes, SharedModule],
})
export class HabitacionModule {}
