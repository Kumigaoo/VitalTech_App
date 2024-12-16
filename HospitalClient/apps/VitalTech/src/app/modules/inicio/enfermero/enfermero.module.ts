import { NgModule } from '@angular/core';
import { EnfermeroRoutes } from './enfermero-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EnfermersComponent } from '../../../../../../../libs/pages/Enfermero/enfermers.component';
import { RegistroEnfermeroComponent } from '../../../../../../../libs/pages/Enfermero/1/pages/registro-enfermero/registro-enfermero.component';
import { ModifEnfermeroComponent } from '../../../../../../../libs/pages/Enfermero/1/pages/modif-enfermero/modif-enfermero.component';

@NgModule({
  declarations: [
    EnfermersComponent,
    RegistroEnfermeroComponent,
    ModifEnfermeroComponent,
  ],
  imports: [EnfermeroRoutes, SharedModule],
})
export class EnfermeroModule {}
