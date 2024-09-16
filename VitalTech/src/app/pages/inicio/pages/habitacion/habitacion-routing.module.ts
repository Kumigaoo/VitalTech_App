import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HabitacionComponent } from "./habitacion.component";

const routes: Routes = [
    {
        path: '',
        component: HabitacionComponent
    },
    {
        path: 'modif-habitacion',
        loadChildren: ()=> import('./pages/modif-habitacion/modif-habitacion.module').then(m => m.ModifHabitacionModule)
    },
    {
        path: 'registro-habitacion',
        loadChildren: ()=> import('./pages/registro-habitacion/registro-habitacion.module').then(m => m.RegistroHabitacionModule)
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HabitacionRoutes {
    
}