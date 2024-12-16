import { NgModule } from '@angular/core';
import { EnfermeroRoutes } from './enfermero-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EnfermersComponent } from '../../../../../../../libs/pages/Enfermero/enfermers.component';

@NgModule({
  declarations: [
    EnfermersComponent
  ],
  imports: [EnfermeroRoutes, SharedModule],
})
export class EnfermeroModule {}
