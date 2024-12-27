import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoRoute } from './medico-routing.module';

import { MedicoDashboardComponent } from '../../../pages/inicio/pages/medico/medico-dashboard/medico-dashboard.component';

import { BuscarPacienteComponent } from '../../../pages/inicio/pages/medico/pages/buscar-paciente/buscar-paciente.component';
import { ConsultasProgramadasComponent } from '../../../pages/inicio/pages/medico/pages/consultas-programadas/consultas-programadas.component';

import { IngresosAdministrativoComponent } from '../../../pages/inicio/pages/medico/pages/ingresos-administrar/ingresos-administrar.component';
import { MedicoComponent } from '../../../pages/inicio/pages/medico/medico.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MedicoComponent,
    BuscarPacienteComponent,
    ConsultasProgramadasComponent,
    IngresosAdministrativoComponent,
  ],
  imports: [MedicoRoute, MedicoDashboardComponent, SharedModule],
})
export class MedicoModule {}
