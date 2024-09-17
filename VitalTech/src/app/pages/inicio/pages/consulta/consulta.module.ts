import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsultaComponent } from "./consulta.component";
import { ConsultaComponentRout } from "./consulta-routing.module"



@NgModule ({
    declarations:
        [ConsultaComponentRout],
    imports: 
        [CommonModule, ConsultaComponent],

})

export class CamaModule {

}