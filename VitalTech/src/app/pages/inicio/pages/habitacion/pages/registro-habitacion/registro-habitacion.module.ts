import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistroHabitacionComponent } from "./registro-habitacion.component";
import { RegistrohabitacionRoutes } from "./registro-habitacion-routing.module";

@NgModule ({
    declarations:
        [RegistroHabitacionComponent ],
    imports: 
        [CommonModule, RegistrohabitacionRoutes],

})

export class RegistroHabitacionModule {

}