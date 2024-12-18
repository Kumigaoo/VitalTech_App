import { EnfermersComponent } from '../../../../../../../libs/pages/Enfermero/enfermers.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: EnfermersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnfermeroRoutes {}
