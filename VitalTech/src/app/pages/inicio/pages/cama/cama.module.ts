import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {CamaComponent} from "./cama.component";
import { CamaRoutes} from "./cama-routing.module"

@NgModule ({
    declarations:
        [CamaComponent],
    imports: 
        [CamasComponent],
    imports:
        [CommonModule, CamaRoutes],
})

export class CamaModule {

}
