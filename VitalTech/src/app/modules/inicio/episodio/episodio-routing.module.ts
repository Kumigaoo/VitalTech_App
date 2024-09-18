import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { EpisodioComponent } from "../../../pages/inicio/pages/episodio/episodio.component";
import { ModifEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component";
import { RegistroEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodio.component";

const routes: Routes = [
    {
        path: '',
        component: EpisodioComponent
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