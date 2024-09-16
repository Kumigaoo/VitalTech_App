import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ModifEpisodiComponent } from "./modif-episodio.component";

const routes: Routes = [
    {
        path: '',
        component: ModifEpisodiComponent
    },
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EpisodioRoutes {
    
}