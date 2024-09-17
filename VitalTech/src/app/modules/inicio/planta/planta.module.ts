import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {PlantaComponent} from "../../../pages/inicio/pages/planta/planta.component";
import { PlantaRoutes} from "./planta-routing.module";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NavComponent } from "../../../components/nav/nav.component";




@NgModule ({
    declarations:
        [PlantaComponent],
    imports: 
        [CommonModule, PlantaRoutes, RouterLink, RouterLinkActive, FormsModule, NavComponent],

})

export class PlantaModule {

}