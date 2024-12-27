import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPacienteComponent } from '../../../pages/inicio/pages/medico/pages/buscar-paciente/buscar-paciente.component';
import { ConsultasProgramadasComponent } from '../../../pages/inicio/pages/medico/pages/consultas-programadas/consultas-programadas.component';
import { MedicoComponent } from '../../../pages/inicio/pages/medico/medico.component';
import { IngresosAdministrativoComponent } from '../../../pages/inicio/pages/medico/pages/ingresos-administrar/ingresos-administrar.component';

const routes: Routes = [
  {
    path: '',
    component: MedicoComponent,
  },
  {
    path: 'buscar-paciente',
    component: BuscarPacienteComponent,
  },
  {
    path: 'consultas-programadas',
    component: ConsultasProgramadasComponent,
  },
  {
    path: 'ingresos-administrar',
    component: IngresosAdministrativoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoRoute {}
