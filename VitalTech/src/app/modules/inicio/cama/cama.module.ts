import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {CamaComponent} from "../../../pages/inicio/pages/cama/cama.component";
import { CamaRoutes} from "./cama-routing.module"
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NavComponent } from "../../../components/nav/nav.component";

@NgModule ({
    declarations:
        [CamaComponent],
    imports:
        [CommonModule, CamaRoutes, RouterLink, RouterLinkActive, FormsModule, NavComponent],
})

export class CamaModule {

}
