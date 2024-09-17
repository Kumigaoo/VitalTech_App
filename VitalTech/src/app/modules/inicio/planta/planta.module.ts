import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {PlantaComponent} from "../../../pages/inicio/pages/planta/planta.component";
import { PlantaRoutes} from "./planta-routing.module";




@NgModule ({
    declarations:
        [PlantaComponent],
    imports: 
        [CommonModule, PlantaRoutes],

})

export class PlantaModule {

}