import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModifHabitacionComponent } from "./modif-habitacion.component";
import { ModifHabitacionRoutes } from "./modif-habitacion-routing.module";

@NgModule ({
    declarations:
        [ModifHabitacionComponent ],
    imports: 
        [CommonModule, ModifHabitacionRoutes],

})

export class ModifHabitacionModule {

}