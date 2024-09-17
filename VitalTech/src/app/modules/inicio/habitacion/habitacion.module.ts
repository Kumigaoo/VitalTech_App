import { NgModule } from "@angular/core";
import {HabitacionComponent} from "../../../pages/inicio/pages/habitacion/habitacion.component";
import { HabitacionRoutes } from "./habitacion-routing.module";
import { SharedModule } from "../../../shared/shared.module";




@NgModule ({
    declarations:
        [HabitacionComponent],
    imports: 
        [HabitacionRoutes, SharedModule],

})

export class HabitacionModule {

}