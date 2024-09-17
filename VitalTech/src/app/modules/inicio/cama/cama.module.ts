import { NgModule } from "@angular/core";
import {CamaComponent} from "../../../pages/inicio/pages/cama/cama.component";
import { CamaRoutes} from "./cama-routing.module"
import { RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";



@NgModule ({
    declarations:
        [CamaComponent],
    imports:
        [CamaRoutes],
})

export class CamaModule {

}
