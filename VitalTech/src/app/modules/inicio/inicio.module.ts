import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import InicioComponent from "../../pages/inicio/inicio.component";
import { InicioRoutes} from "./inicio-routing.module"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "../../components/nav/nav.component";
import { RouterLink, RouterLinkActive } from "@angular/router";




@NgModule ({
    declarations:
        [InicioComponent],
    imports: 
        [CommonModule, InicioRoutes, ReactiveFormsModule, NavComponent, RouterLinkActive, FormsModule, RouterLink],

})

export class InicioModule {

}