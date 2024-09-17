import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsultaComponent } from "./consulta.component";
import { ConsultaComponentRout } from "./consulta-routing.module"
import { NavComponent } from "../../../../components/nav/nav.component";



@NgModule ({
    declarations:
        [ConsultaComponentRout, ConsultaComponent],
    imports: 
        [CommonModule, NavComponent],

})

export class consultaModule {

}