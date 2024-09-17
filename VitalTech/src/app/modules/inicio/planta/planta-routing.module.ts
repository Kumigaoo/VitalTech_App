import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {PlantaComponent} from "../../../pages/inicio/pages/planta/planta.component";
import { ModifPlantaComponent } from "../../../pages/inicio/pages/planta/pages/modif-planta/modif-planta.component";
import { RegistroIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingres.component";

const routes: Routes = [
    {
        path: '',
        component: PlantaComponent
    },
    {
        path: 'modif-planta',
       component: ModifPlantaComponent
    },
    {
        path: 'registro-planta',
        component: RegistroIngresComponent
        
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlantaRoutes {
    
}