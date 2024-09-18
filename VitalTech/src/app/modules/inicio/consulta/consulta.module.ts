import { NgModule } from "@angular/core";
import { ConsultaComponent } from "../../../pages/inicio/pages/consulta/consulta.component";
import { RegistroConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/registro-consulta/registro-consulta.component";
import { ModifConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/modif-consulta/modif-consulta.component";
import { SharedModule } from "../../shared/shared.module";
import { ConsultaComponentRout } from "./consulta-routing.module";


@NgModule ({        
    declarations:
        [ConsultaComponent, RegistroConsultaComponent, ModifConsultaComponent],
    imports: 
        [ConsultaComponentRout, SharedModule],

})

export class ConsultaModule {

}