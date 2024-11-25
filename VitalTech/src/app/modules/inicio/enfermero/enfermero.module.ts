import { NgModule } from "@angular/core";
import { EnfermeroRoutes} from "./enfermero-routing.module"
import { SharedModule } from "../../shared/shared.module";
import { EnfermeroComponent } from "../../../pages/inicio/pages/enfermero/enfermero.component";
import { RegistroEnfermeroComponent } from "../../../pages/inicio/pages/enfermero/pages/registro-enfermero/registro-enfermero.component";
import { ModifEnfermeroComponent } from "../../../pages/inicio/pages/enfermero/pages/modif-enfermero/modif-enfermero.component";

@NgModule ({
    declarations:
        [EnfermeroComponent, RegistroEnfermeroComponent, ModifEnfermeroComponent],
    imports:
        [EnfermeroRoutes, SharedModule],
})

export class EnfermeroModule {

}
