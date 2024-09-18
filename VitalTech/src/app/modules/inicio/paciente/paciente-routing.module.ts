import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PacientesComponent } from "../../../pages/inicio/pages/paciente/pacientes.component";
import { ModifPacienteComponent } from "../../../pages/inicio/pages/paciente/pages/modif-paciente/modif-paciente.component";
import { RegistroComponent } from "../../../pages/inicio/pages/paciente/pages/registro-paciente/registro.component";

const routes: Routes = [
    {
        path: '',
        component: PacientesComponent
    },
    {
        path: 'modif-paciente',
        component: ModifPacienteComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    }


]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PacienteRoutes {
    
}