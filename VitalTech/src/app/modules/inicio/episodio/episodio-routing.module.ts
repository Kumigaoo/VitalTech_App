import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { EpisodisComponent } from "../../../pages/inicio/pages/episodio/episodis.component";
import { ModifEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component";
import { RegistroEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodi.component";

const routes: Routes = [
    {
        path: '',
        component: EpisodisComponent
    },
    {
        path: 'modif-episodio',
        component: ModifEpisodiComponent
    },
    {
        path: 'registro-episodio',
        component: RegistroEpisodiComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CamaRoutes {
    
}