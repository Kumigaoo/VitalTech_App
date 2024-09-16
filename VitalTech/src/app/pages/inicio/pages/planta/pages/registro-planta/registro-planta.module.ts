import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistroPlantaComponent } from "./registro-planta.component";
import { RegistroPlantaRoutes } from "./registro-planta-routing.module";

@NgModule ({
    declarations:
        [RegistroPlantaComponent, RegistroPlantaRoutes],
    imports: 
        [CommonModule],

})

export class RegistroPlantaModule {

}