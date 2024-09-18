import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IngresComponent } from "../../../pages/inicio/pages/ingreso/ingres.component";
import { ModifIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingres.component";
import { RegistroIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingres.component";

const routes: Routes = [
    {
        path: 'ingres',
        component: IngresComponent
    },
    {
        path: 'modif-ingres',
        component: ModifIngresComponent
    },
    {
        path: 'registro-ingres',
        component: RegistroIngresComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IngresRoutes {
    
}