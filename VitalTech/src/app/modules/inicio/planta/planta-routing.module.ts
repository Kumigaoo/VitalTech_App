import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {PlantaComponent} from "../../../pages/inicio/pages/planta/planta.component";
import { ModifPlantaComponent } from "../../../pages/inicio/pages/planta/pages/modif-planta/modif-planta.component";
import { RegistroIngresoComponent } from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component";

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
        component: RegistroIngresoComponent
        
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlantaRoutes {
    
}