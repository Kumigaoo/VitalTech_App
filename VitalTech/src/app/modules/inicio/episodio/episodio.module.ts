import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {EpisodisComponent} from "../../../pages/inicio/pages/episodio/episodis.component";
import { CamaRoutes} from "./episodio-routing.module"

@NgModule ({
    declarations:
        [EpisodisComponent],
    imports:
        [CommonModule, CamaRoutes],
})

export class EpisodioModule {

}
