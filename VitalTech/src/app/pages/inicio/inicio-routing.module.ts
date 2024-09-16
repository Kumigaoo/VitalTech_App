import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import InicioComponent from "./inicio.component";

const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'cama',
        loadChildren: ()=> import('./pages/cama/cama.module').then(m => m.CamaModule)
    },
    {
        path: 'consulta',

    }
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioRoutes {
    
}