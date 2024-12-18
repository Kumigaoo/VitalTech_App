import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModifEpisodiComponent } from '../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component';
import { RegistroEpisodiComponent } from '../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodio.component';
import { EpisodiComponent } from '../../../../../../../libs/pages/Episodio/episodioPrueba.component';

const routes: Routes = [
  {
    path: '',
    component: EpisodiComponent,
  },
  {
    path: 'modif-episodio/:id',
    component: ModifEpisodiComponent,
  },
  {
    path: 'registro-episodio',
    component: RegistroEpisodiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodioRout {}
