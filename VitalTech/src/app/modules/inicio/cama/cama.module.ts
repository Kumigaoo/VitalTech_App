import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {CamasComponent} from "./camas.component";
import { CamaRoutes } from "./cama-routing.module"

@NgModule ({
    declarations:
        [CamaComponent],
    imports:
        [CommonModule, CamaRoutes],
})

export class CamaModule {

}
