import { NgModule } from '@angular/core';
import { EpisodioComponent } from '../../../pages/inicio/pages/episodio/episodio.component';
import { ModifEpisodiComponent } from '../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component';
import { RegistroEpisodiComponent } from '../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodio.component';
import { EpisodioRout } from './episodio-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EpisodioComponent,
    ModifEpisodiComponent,
    RegistroEpisodiComponent,
  ],
  imports: [SharedModule, EpisodioRout],
})
export class EpisodioModule {}
