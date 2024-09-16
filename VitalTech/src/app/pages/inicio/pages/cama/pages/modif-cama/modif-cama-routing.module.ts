import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ModifCamaComponent } from "./modif-cama.component";

const routes: Routes = [
    {
        path: '',
        component: ModifCamaComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ModifCamaRoutes {
    
}