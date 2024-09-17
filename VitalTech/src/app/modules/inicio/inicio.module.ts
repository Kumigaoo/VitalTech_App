import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import InicioComponent from "../../pages/inicio/inicio.component";
import { InicioRoutes} from "./inicio-routing.module"




@NgModule ({
    declarations:
        [InicioComponent],
    imports: 
        [CommonModule, InicioRoutes],

})

export class InicioModule {

}