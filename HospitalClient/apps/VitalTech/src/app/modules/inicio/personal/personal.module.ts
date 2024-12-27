import { NgModule } from '@angular/core';
import { PersonalRoutes } from './personal-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MetgesComponent } from '../../../../../../../libs/pages/Medico/metges.component';

@NgModule({
  declarations: [
    MetgesComponent,
  ],
  imports: [PersonalRoutes, SharedModule],
})
export class PersonalModule {}
