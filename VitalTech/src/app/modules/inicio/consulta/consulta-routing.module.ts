import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ConsultaComponent } from "../../../pages/inicio/pages/consulta/consulta.component";
import { ModifConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/modif-consulta/modif-consulta.component";
import { RegistroConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/registro-consulta/registro-consulta.component";

const routes: Routes = [  
  
  {
    path: '',
    component: ConsultaComponent
  },

  {
    path: 'modif-consulta', 
  component: ModifConsultaComponent
  },
      
  {
    path: 'registro-consulta', 
    component: RegistroConsultaComponent
  },

]

  @NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConsultaComponentRout {
    
}