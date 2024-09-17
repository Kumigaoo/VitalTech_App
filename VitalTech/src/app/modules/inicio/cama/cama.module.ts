import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {CamaComponent} from "../../../pages/inicio/pages/cama/cama.component";
import { CamaRoutes} from "./cama-routing.module"

@NgModule ({
    declarations:
        [CamaComponent],
    imports:
        [CommonModule, CamaRoutes],
})

export class CamaModule {

}
