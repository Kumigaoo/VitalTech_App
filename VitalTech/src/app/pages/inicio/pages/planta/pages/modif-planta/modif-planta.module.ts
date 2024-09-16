import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ModifPlantaComponent} from "./modif-planta.component";
import { ModifPlantaRoutes } from "./modif-planta-routing.module";

@NgModule ({
    declarations:
        [ModifPlantaComponent],
    imports: 
        [CommonModule, ModifPlantaRoutes],

})

export class ModifPlantaModule {

}