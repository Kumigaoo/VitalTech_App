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
        path: 'episodio',
        loadChildren: ()=> import('./episodio/episodio.module').then(m => m.EpisodioModule)
    },
    {
        path: 'habitacion',
        loadChildren: ()=> import('./habitacion/habitacion.module').then(m => m.HabitacionModule)
    },
    {
        path: 'ingreso',
        loadChildren: ()=> import ('./ingreso/ingreso.module').then(m => m.IngresoModule)
    },
 
    {
        path: 'planta',
        loadChildren: ()=> import('./planta/planta.module').then(m => m.PlantaModule)
    }
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioRoutes {
    
}