import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {EpisodisComponent} from "../../../pages/inicio/pages/episodio/episodis.component";
import { CamaRoutes} from "./episodio-routing.module"
import { SharedModule } from "../../shared/shared.module";
import { RegistroEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/registro-episodio/registro-episodi.component";
import { ModifEpisodiComponent } from "../../../pages/inicio/pages/episodio/pages/modif-episodio/modif-episodio.component";

@NgModule ({
    declarations:
        [EpisodisComponent, RegistroEpisodiComponent, ModifEpisodiComponent],
    imports:
        [SharedModule, CamaRoutes],
})

export class EpisodioModule {

}
