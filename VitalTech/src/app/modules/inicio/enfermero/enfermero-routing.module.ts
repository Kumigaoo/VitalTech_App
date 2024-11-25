import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ModifEnfermeroComponent } from "../../../pages/inicio/pages/enfermero/pages/modif-enfermero/modif-enfermero.component";
import { EnfermeroComponent } from "../../../pages/inicio/pages/enfermero/enfermero.component";
import { RegistroEnfermeroComponent } from "../../../pages/inicio/pages/enfermero/pages/registro-enfermero/registro-enfermero.component";

const routes: Routes = [
    {
        path: '',
        component: EnfermeroComponent
    },
    {
        path: 'modif-enfermero/:id',
        component: ModifEnfermeroComponent
    },
    {
        path: 'registro-enfermero',
        component: RegistroEnfermeroComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EnfermeroRoutes {
    
}