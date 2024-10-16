import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamasComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/camas/camas.component';
import { AsignacionesComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/asignaciones/asignaciones.component';
import { HabitacionesComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/habitaciones/habitaciones.component';
import { HistorialAltasComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/historial-altas/historial-altas.component';
import { PacientesComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/pacientes/pacientes.component';
import { RolesComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/roles/roles.component';
import { UsuariosComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/usuarios/usuarios.component';
import { IngresosComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/ingresos/ingresos.component';
import { ConsultasComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/consultas/consultas.component';
import { AdministradorSistemaComponent } from '../../../pages/inicio/pages/administrador-sistema/administrador-sistema.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradorSistemaComponent
  },
  {
    path: 'camas', 
    component: CamasComponent
  },
  {
    path: 'asignaciones', 
    component: AsignacionesComponent
  }, 
  {
    path: 'habitaciones', 
    component: HabitacionesComponent
  },
  {
    path: 'historial-altas', 
    component: HistorialAltasComponent
  },
  {
    path: 'pacientes', 
    component: PacientesComponent
  },
  {
    path: 'roles', 
    component: RolesComponent
  },
  {
    path: 'usuarios', 
    component: UsuariosComponent
  },
  {
    path: 'ingresos', 
    component: IngresosComponent
  },
  {
    path: 'consultas',
    component: ConsultasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorSistemaRoute { }
