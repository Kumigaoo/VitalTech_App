import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ModifPlantaComponent } from "./modif-planta.component";

const routes: Routes = [
    {
        path: '',
        component: ModifPlantaComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ModifPlantaRoutes {
    
}