import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PruebasComponent } from '../../../../../../../libs/pages/Pruebas-diagnosticas/pruebas.component'; 
import { ModifConsultaComponent } from '../../../pages/inicio/pages/consulta/pages/modif-consulta/modif-pruebas-diagnosticas.component';
import { RegistroConsultaComponent } from '../../../pages/inicio/pages/consulta/pages/registro-consulta/registro-pruebas-diagnosticas.component';

const routes: Routes = [
  {
    path: '',
    component: PruebasComponent,
  },
  {
    path: 'modif-consulta/:id',
    component: ModifConsultaComponent,
  },

  {
    path: 'registro-consulta',
    component: RegistroConsultaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaRout {}
