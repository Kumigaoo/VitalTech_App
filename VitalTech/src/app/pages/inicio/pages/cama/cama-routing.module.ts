import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CamasComponent } from "./camas.component";

const routes: Routes = [
    {
        path: '',
        component: CamasComponent
    },
    {
        path: 'modif-llit',
        loadChildren: ()=> import('./pages/modif-cama/modif-llit.module').then(m => m.ModifCamaModule)
    },
    {
        path: 'registro-llit',
        loadChildren: ()=> import('./pages/registro-cama/registro-cama.module').then(m => m.RegistroCamaModule)
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CamaRoutes {
    
}