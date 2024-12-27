import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdministradoresSistemaComponent } from '../../../../../../../libs/pages/AdministradorSistema/administradores-sistema.component';
import { AdministradorRoutes } from './administradorr-routing.module';

@NgModule({
  declarations: [AdministradoresSistemaComponent],
  imports: [AdministradorRoutes, SharedModule],
})
export class AdministradorSistemaModule {}
