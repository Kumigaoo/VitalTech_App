import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ModifHabitacionComponent } from "./modif-habitacion.component";

const routes: Routes = [
    {
        path: '',
        component: ModifHabitacionComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ModifHabitacionRoutes {
    
}