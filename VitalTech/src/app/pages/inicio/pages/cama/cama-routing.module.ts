import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CamasComponent } from "./camas.component";

const routes: Routes = [
    {
        path: '',
        component: CamasComponent
    },
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CamaRoutes {
    
}