import { NgModule } from "@angular/core";
import { IngresoRoutes} from "./ingreso-routing.module"
import { IngresoComponent } from "../../../pages/inicio/pages/ingreso/ingreso.component";
import { SharedModule } from "../../shared/shared.module";
import { RegistroIngresoComponent} from "../../../pages/inicio/pages/ingreso/pages/registro-ingres/registro-ingreso.component";
import { ModifIngresoComponent } from "../../../pages/inicio/pages/ingreso/pages/modif-ingres/modif-ingreso.component";

@NgModule ({
    declarations:
        [IngresoComponent, RegistroIngresoComponent, ModifIngresoComponent],
    imports:
        [IngresoRoutes, SharedModule],
})

export class IngresoModule {

}
