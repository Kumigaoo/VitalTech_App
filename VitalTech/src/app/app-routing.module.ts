import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const routes: Routes = [
  {path: 'inicio', loadChildren: ()=> import('./modules/inicio/inicio.module').then(m => m.InicioModule)},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
