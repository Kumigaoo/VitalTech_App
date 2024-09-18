import { NgModule } from "@angular/core";
import { IngresRoutes} from "./ingreso-routing.module"
import { IngresComponent } from "../../../pages/inicio/pages/ingreso/ingres.component";
import { SharedModule } from "../../shared/shared.module";
import { RegistroIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingres.component";
import { ModifIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingres.component";

@NgModule ({
    declarations:
        [IngresComponent, RegistroIngresComponent, ModifIngresComponent],
    imports:
        [IngresRoutes, SharedModule],
})

export class IngresoModule {

}
