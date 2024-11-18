import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PruebasDiagnosticasComponent } from "../../../pages/inicio/pages/consulta/pruebas-diagnosticas.component";
import { ModifConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/modif-consulta/modif-pruebas-diagnosticas.component";
import { RegistroConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/registro-consulta/registro-pruebas-diagnosticas.component";

const routes: Routes = [  
  { 
    path: '',
    component: PruebasDiagnosticasComponent
  },
  {
    path: 'modif-consulta/:id', 
    component: ModifConsultaComponent
  },
      
  {
    path: 'registro-consulta', 
    component: RegistroConsultaComponent

  }
]

  @NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConsultaRout {
    
}