import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import InicioComponent from "../../pages/inicio/inicio.component";

const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'cama',
        loadChildren: ()=> import('./cama/cama.module').then(m => m.CamaModule)
    },
    {
        path: 'consulta',

    }, 
    {
        path: 'episodio',
    },
    {
        path: 'habitacion',
        loadChildren: ()=> import('../../pages/inicio/pages/habitacion/habitacion.module').then(m => m.HabitacionModule)
    },
    {
        path: 'ingreso',
    },
    {
        path: 'paciente',
    },
    {
        path: 'personal',
    },
    {
        path: 'planta',
        loadChildren: ()=> import('../../pages/inicio/pages/planta/planta.module').then(m => m.PlantaModule)
    }
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioRoutes {
    
}