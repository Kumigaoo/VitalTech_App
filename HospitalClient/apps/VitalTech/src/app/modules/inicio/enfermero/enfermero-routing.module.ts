import { RegistroEnfermeroComponent } from './../../../../../../../libs/pages/Enfermero/1/pages/registro-enfermero/registro-enfermero.component';
import { EnfermersComponent } from '../../../../../../../libs/pages/Enfermero/enfermers.component';
import { ModifEnfermeroComponent } from './../../../../../../../libs/pages/Enfermero/1/pages/modif-enfermero/modif-enfermero.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: EnfermersComponent,
  },
  {
    path: 'modif-enfermero/:id',
    component: ModifEnfermeroComponent,
  },
  {
    path: 'registro-enfermero',
    component: RegistroEnfermeroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnfermeroRoutes {}
