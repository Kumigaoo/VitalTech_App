import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministrativoDashboardComponent } from '../../../pages/inicio/pages/administrativo/administrativo-dashboard/administrativo-dashboard.component';
import { AdministrativoRout } from './administrativo-routing.module';
import { RegistrarPacienteComponent } from '../../../pages/inicio/pages/administrativo/pages/registrar-paciente/registrar-paciente.component';
import { BuscarPacientesComponent } from '../../../pages/inicio/pages/administrativo/pages/buscar-paciente/buscar-pacientes.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdministrativoComponent } from '../../../pages/inicio/pages/administrativo/administrativo.component';
import { PacientesAdministrativoComponent } from '../../../pages/inicio/pages/administrativo/pages/pacientes-administrar/pacientes-administrar.component';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdministrativoComponent,
    RegistrarPacienteComponent,
    BuscarPacientesComponent,
    PacientesAdministrativoComponent,
  ],
  imports: [AdministrativoRout, AdministrativoDashboardComponent, SharedModule],
})
export class AdministrativoModule {}
