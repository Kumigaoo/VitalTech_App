import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RegistroCamaComponent } from "./registro-cama.component";

const routes: Routes = [
    {
        path: '',
        component: RegistroCamaComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistroCamaRoutes {
    
}