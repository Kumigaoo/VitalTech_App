import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RegistroHabitacionComponent } from "./registro-habitacion.component";

const routes: Routes = [
    {
        path: '',
        component: RegistroHabitacionComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistrohabitacionRoutes {
    
}