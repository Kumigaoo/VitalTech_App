import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import InicioComponent from './pages/inicio/inicio.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
