import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {EpisodisComponent} from "./episodis.component";
import { EpisodioRoutes} from "./episodio-routing.module"

@NgModule ({
    declarations:
        [EpisodisComponent],
    imports: 
        [CommonModule, EpisodioRoutes],
})

export class CamaModule {

}