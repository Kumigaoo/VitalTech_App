import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamasComponent } from '../../../../../../../libs/pages/Cama/camas.component';
import { HabitacionesComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/habitaciones/habitaciones.component';
import { PacientesComponent } from '../../../../../../../libs/pages/pacientes/pacientes.component';
// import { UsuariosComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/usuarios/usuarios.component';
import { IngresosComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/ingresos/ingresos.component';
import { AdministradorSistemaComponent } from '../../../pages/inicio/pages/administrador-sistema/administrador-sistema.component';
import { PlantesComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/plantes/plantes.component';
import { EpisodisMedicsComponent } from '../../../../../../../libs/pages/Episodio/episodis-medics.component';
import { MetgesComponent } from '../../../../../../../libs/pages/Medico/metges.component';
import { EnfermersComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/enfermers/enfermers.component';
import { PruebasComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/consultas/pruebas.component';
import { AdministradoresSistemaComponent } from '../../../pages/inicio/pages/administrador-sistema/pages/administradores-sistema/administradores-sistema.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradorSistemaComponent,
  },
  {
    path: 'camas',
    component: CamasComponent,
  },

  {
    path: 'episodis-medics',
    component: EpisodisMedicsComponent,
  },

  {
    path: 'habitaciones',
    component: HabitacionesComponent,
  },
  {
    path: 'pacientes',
    component: PacientesComponent,
  },
  // {
   // path: 'usuarios',
   // component: UsuariosComponent,
  // },
  {
    path: 'ingresos',
    component: IngresosComponent,
  },
  {
    path: 'pruebas',
    component: PruebasComponent,
  },
  {
    path: 'plantes',
    component: PlantesComponent,
  },
  {
    path: 'metges',
    component: MetgesComponent,
  },
  {
    path: 'enfermers',
    component: EnfermersComponent,
  },
  {
    path: 'administradores-sistema',
    component: AdministradoresSistemaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorSistemaRoute {}
