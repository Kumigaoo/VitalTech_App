import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {EpisodioComponent} from "../../../pages/inicio/pages/episodio/episodio.component";
import { ModifEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component";
import { RegistroEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodio.component";
import { CamaRoutes} from "./episodio-routing.module"
import { SharedModule } from "../../shared/shared.module";

@NgModule ({
    declarations:
        [EpisodioComponent, ModifEpisodiComponent, RegistroEpisodiComponent],
    imports:
        [CommonModule, SharedModule, CamaRoutes],
})

export class EpisodioModule {

}
