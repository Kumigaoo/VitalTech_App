import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {HabitacionComponent} from "../../../pages/inicio/pages/habitacion/habitacion.component";
import { HabitacionRoutes } from "./habitacion-routing.module";




@NgModule ({
    declarations:
        [HabitacionComponent],
    imports: 
        [CommonModule, HabitacionRoutes],

})

export class HabitacionModule {

}