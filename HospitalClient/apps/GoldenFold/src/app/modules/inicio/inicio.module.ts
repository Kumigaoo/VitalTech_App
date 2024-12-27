import { NgModule } from '@angular/core';
import { InicioComponent } from '../../pages/inicio/inicio.component';
import { InicioRoutes } from './inicio-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [InicioRoutes, SharedModule],
})
export class InicioModule {}
