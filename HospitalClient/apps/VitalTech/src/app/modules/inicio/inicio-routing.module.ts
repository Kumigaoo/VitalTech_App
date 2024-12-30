import { UsuarioModule } from './usuario/usuario.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import InicioComponent from '../../pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },

  {
    path: 'cama',
    loadChildren: () => import('./cama/cama.module').then((m) => m.CamaModule),
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then((m) => m.UsuarioModule)
  },
  {
    path: 'consulta',
    loadChildren: () =>
      import('./consulta/consulta.module').then((m) => m.ConsultaModule),
  },

  {
    path: 'episodio',
    loadChildren: () =>
      import('./episodio/episodio.module').then((m) => m.EpisodioModule),
  },

  {
    path: 'habitacion',
    loadChildren: () =>
      import('./habitacion/habitacion.module').then((m) => m.HabitacionModule),
  },

  {
    path: 'ingreso',
    loadChildren: () =>
      import('./ingreso/ingreso.module').then((m) => m.IngresoModule),
  },

  {
    path: 'paciente',
    loadChildren: () =>
      import('./paciente/paciente.module').then((m) => m.PacienteModule),
  },

  {
    path: 'personal',
    loadChildren: () =>
      import('./personal/personal.module').then((m) => m.PersonalModule),
  },

  {
    path: 'planta',
    loadChildren: () =>
      import('./planta/planta.module').then((m) => m.PlantaModule),
  },
  {
    path: 'consulta',
    loadChildren: () =>
      import('./consulta/consulta.module').then((m) => m.ConsultaModule),
  },
  {
    path: 'enfermero',
    loadChildren: () =>
      import('./enfermero/enfermero.module').then((m) => m.EnfermeroModule),
  },
  {
    path: 'administradorSistema',
    loadChildren: () =>
      import('./AdministradorSistema/administrador-sistema.module').then((m) => m.AdministradorSistemaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRoutes {}
