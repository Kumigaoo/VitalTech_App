import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {PlantaComponent} from "../../../pages/inicio/pages/planta/planta.component";
import { ModifPlantaComponent } from "../../../pages/inicio/pages/planta/pages/modif-planta/modif-planta.component";
import { RegistroPlantaComponent } from "../../../pages/inicio/pages/planta/pages/registro-planta/registro-planta.component";

const routes: Routes = [
    {
        path: '',
        component: PlantaComponent
    },
    {
        path: 'modif-planta/:id',
       component: ModifPlantaComponent
    },
    {
        path: 'registro-planta',
        component: RegistroPlantaComponent
        
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlantaRoutes {
    
}