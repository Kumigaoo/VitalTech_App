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
import { AdministradorSistemaDashboardComponent } from '../../../pages/inicio/pages/administrador-sistema/administrador-sistema-dashboard/administrador-sistema-dashboard.component';

@NgModule({
  declarations: [
    AdministrativoComponent,
    RegistrarPacienteComponent,
    BuscarPacientesComponent,
    PacientesAdministrativoComponent,
    AdministradorSistemaDashboardComponent,
  ],
  imports: [AdministrativoRout, AdministrativoDashboardComponent, SharedModule, CommonModule, AdministradorSistemaDashboardComponent],
})
export class AdministrativoModule {}
