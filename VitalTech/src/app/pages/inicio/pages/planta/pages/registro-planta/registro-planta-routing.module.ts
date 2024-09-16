import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RegistroPlantaComponent } from "./registro-planta.component";

const routes: Routes = [
    {
        path: '',
        component: RegistroPlantaComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistroPlantaRoutes {
    
}