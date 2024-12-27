import { NgModule } from '@angular/core';
import { ModifEpisodiComponent } from '../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component';
import { RegistroEpisodiComponent } from '../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodio.component';
import { EpisodioRout } from './episodio-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EpisodiComponent } from '../../../../../../../libs/pages/Episodio/episodio-medico.component';

@NgModule({
  declarations: [
    EpisodiComponent,
    ModifEpisodiComponent,
    RegistroEpisodiComponent,
  ],
  imports: [SharedModule, EpisodioRout],
})
export class EpisodioModule {}
