import { NgModule } from "@angular/core";
import { IngresRoutes} from "./ingreso-routing.module"
import { IngresoComponent } from "../../../pages/inicio/pages/ingreso/ingreso.component";
import { SharedModule } from "../../shared/shared.module";
import { RegistroIngresComponent} from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component";
import { ModifIngresComponent } from "../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingreso.component";

@NgModule ({
    declarations:
        [IngresoComponent, RegistroIngresComponent, ModifIngresComponent],
    imports:
        [IngresRoutes, SharedModule],
})

export class IngresoModule {

}
