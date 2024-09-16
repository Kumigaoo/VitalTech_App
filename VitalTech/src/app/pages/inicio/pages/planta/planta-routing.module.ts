import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {PlantaComponent} from "./planta.component";

const routes: Routes = [
    {
        path: '',
        component: PlantaComponent
    },
    {
        path: 'modif-planta',
        loadChildren: ()=> import('./pages/modif-planta/modif-planta.module').then(m => m.ModifPlantaModule)
    },
    {
        path: 'registro-planta',
        loadChildren: ()=> import('./pages/registro-planta/registro-planta.module').then(m => m.RegistroPlantaModule)
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlantaRoutes {
    
}