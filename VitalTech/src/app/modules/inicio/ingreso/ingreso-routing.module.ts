import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IngresoComponent } from "../../../pages/inicio/pages/ingreso/ingreso.component";
import { ModifIngresoComponent } from "../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingreso.component";
import { RegistroIngresoComponent } from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component";

const routes: Routes = [
    {
        path: '',
        component: IngresoComponent
    },
    {
        path: 'modif-ingreso',
        component: ModifIngresoComponent
    },
    {
        path: 'registro-ingreso',
        component: RegistroIngresoComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IngresoRoutes {
    
}