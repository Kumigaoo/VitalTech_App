import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IngresoComponent } from "../../../pages/inicio/pages/ingreso/ingreso.component";
import { ModifIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingreso.component";
import { RegistroIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component";

const routes: Routes = [
    {
        path: '',
        component: IngresoComponent
    },
    {
        path: 'modif-ingreso',
        component: ModifIngresComponent
    },
    {
        path: 'registro-ingreso',
        component: RegistroIngresComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IngresRoutes {
    
}