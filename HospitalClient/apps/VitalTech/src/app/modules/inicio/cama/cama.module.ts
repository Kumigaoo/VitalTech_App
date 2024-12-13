import { NgModule } from '@angular/core';
import { CamasComponent } from '../../../../../../../libs/pages/Cama/camas.component';
import { CamaRoutes } from './cama-routing.module';
import { RegistroCamaComponent } from '../../../pages/inicio/pages/cama/pages/registro-cama/registro-cama.component';
import { ModifCamaComponent } from '../../../pages/inicio/pages/cama/pages/modif-cama/modif-cama.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CamasComponent, RegistroCamaComponent, ModifCamaComponent],
  imports: [CamaRoutes, SharedModule],
})
export class CamaModule {}
