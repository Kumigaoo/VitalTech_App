import { PacientesComponent } from '../../../../../../../libs/pages/pacientes/pacientes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarioComponent } from '../../../../../../../libs/pages/Usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutes {}
