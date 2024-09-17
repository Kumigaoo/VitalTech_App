import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HabitacionComponent } from "../../../pages/inicio/pages/habitacion/habitacion.component";
import { ModifHabitacionComponent } from "../../../pages/inicio/pages/habitacion/pages/modif-habitacion/modif-habitacion.component";
import { RegistroHabitacionComponent } from "../../../pages/inicio/pages/habitacion/pages/registro-habitacion/registro-habitacion.component";

const routes: Routes = [
    {
        path: '',
        component: HabitacionComponent
    },
    {
        path: 'modif-habitacion',
        component: ModifHabitacionComponent
    },
    {
        path: 'registro-habitacion',
       component: RegistroHabitacionComponent
    }

]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HabitacionRoutes {
    
}