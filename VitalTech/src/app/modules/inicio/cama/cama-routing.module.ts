import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CamaComponent } from "../../../pages/inicio/pages/cama/cama.component";
import { ModifCamaComponent } from "../../../pages/inicio/pages/cama/pages/modif-cama/modif-cama.component";
import { RegistroCamaComponent } from "../../../pages/inicio/pages/cama/pages/registro-cama/registro-cama.component";

const routes: Routes = [
    {
        path: 'cama',
        component: CamaComponent
    },
    {
        path: 'modif-cama',
        component: ModifCamaComponent
    },
    {
        path: 'registro-cama',
        component: RegistroCamaComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CamaRoutes {
    
}