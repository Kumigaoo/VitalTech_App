import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {HabitacionComponent} from "../../../pages/inicio/pages/habitacion/habitacion.component";
import { HabitacionRoutes } from "./habitacion-routing.module";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NavComponent } from "../../../components/nav/nav.component";




@NgModule ({
    declarations:
        [HabitacionComponent],
    imports: 
        [CommonModule, HabitacionRoutes, RouterLink, RouterLinkActive, FormsModule, NavComponent],

})

export class HabitacionModule {

}