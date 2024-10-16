import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativoComponent } from '../../../pages/inicio/pages/administrativo/administrativo.component';
import { BuscarPacientesComponent } from '../../../pages/inicio/pages/administrativo/pages/buscar-paciente/buscar-pacientes.component';
import { PacientesAdministrativoComponent } from '../../../pages/inicio/pages/administrativo/pages/pacientes-administrar/pacientes-administrar.component';
import { RegistrarPacienteComponent } from '../../../pages/inicio/pages/administrativo/pages/registrar-paciente/registrar-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent
  },
  {
    path: 'buscar-pacientes',
    component: BuscarPacientesComponent
  },
  {
    path: 'pacientes-administrar',
    component: PacientesAdministrativoComponent
  },
  {
    path: 'registrar-paciente',
    component: RegistrarPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRout { }
