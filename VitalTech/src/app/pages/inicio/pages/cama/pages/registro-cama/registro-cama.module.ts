import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {RegistroCamaComponent} from "./registro-cama.component";
import { RegistroCamaRoutes } from "./registro-cama-routing.module";

@NgModule ({
    declarations:
        [RegistroCamaComponent ],
    imports: 
        [CommonModule, RegistroCamaRoutes],

})

export class RegistroCamaModule {

}