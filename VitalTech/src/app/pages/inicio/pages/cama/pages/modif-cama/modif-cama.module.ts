import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ModifCamaComponent} from "./modif-cama.component";
import { ModifCamaRoutes } from "./modif-cama-routing.module";

@NgModule ({
    declarations:
        [ModifCamaComponent],
    imports: 
        [CommonModule, ModifCamaRoutes],

})

export class ModifCamaModule {

}