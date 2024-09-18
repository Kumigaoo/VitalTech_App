import { NgModule } from "@angular/core";
import { PersonalRoutes} from "./personal-routing.module"
import { SharedModule } from "../../shared/shared.module";
import { RegistroPersonalComponent } from "../../../pages/inicio/pages/personal/pages/registro-personal/registro-personal.component";
import { PersonalComponent } from "../../../pages/inicio/pages/personal/personal.component";
import { ModifPersonalComponent } from "../../../pages/inicio/pages/personal/pages/modif-personal/modif-personal.component";

@NgModule ({
    declarations:
        [PersonalComponent, RegistroPersonalComponent, ModifPersonalComponent],
    imports:
        [PersonalRoutes, SharedModule],
})

export class PersonalModule {

}
