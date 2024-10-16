import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { InicioComponent } from "../../pages/inicio/inicio.component";

const routes: Routes = [

    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'administrativo',
        loadChildren: ()=> import('./administrativo/administrativo.module').then(m => m.AdministrativoModule)
    }, 
    {
        path: 'controlador-camas',
        loadChildren: ()=> import('./controlador-camas/controlador-camas.module').then(m => m.ControladorCamasModule)
    },
    {
        path: 'medico',
        loadChildren: ()=> import('./medico/medico.module').then(m => m.MedicoModule)
    }, 
    {
        path: 'administrador-sistema',
        loadChildren: () => import('./administrador-sistema/administrador-sistema.module').then(m => m.AdministradorSistemaModule)
    }
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioRoutes {
    
}