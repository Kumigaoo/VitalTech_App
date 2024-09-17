import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IngresRoutes} from "./ingreso-routing.module"
import { IngresComponent } from "../../../pages/inicio/pages/ingreso/ingres.component";

@NgModule ({
    declarations:
        [IngresComponent],
    imports:
        [CommonModule, IngresRoutes],
})

export class IngresoModule {

}
