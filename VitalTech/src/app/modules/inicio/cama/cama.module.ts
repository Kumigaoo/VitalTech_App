import { NgModule } from "@angular/core";
import { CamaComponent } from "../../../pages/inicio/pages/cama/cama.component";
import { CamaRoutes} from "./cama-routing.module"
import { RegistroCamaComponent } from "../../../pages/inicio/pages/cama/pages/registro-cama/registro-cama.component";
import { ModifCamaComponent } from "../../../pages/inicio/pages/cama/pages/modif-cama/modif-cama.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule ({
    declarations:
        [CamaComponent, RegistroCamaComponent, ModifCamaComponent],
    imports:
        [CamaRoutes, SharedModule],
})

export class CamaModule {

}
