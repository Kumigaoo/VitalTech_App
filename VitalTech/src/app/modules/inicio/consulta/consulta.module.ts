import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsultaComponent } from "../../../pages/inicio/pages/consulta/consulta.component";
import { NavComponent } from "../../../components/nav/nav.component";
import { RouterLinkActive, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistroConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/registro-consulta/registro-consulta.component";
import { ModifConsultaComponent } from "../../../pages/inicio/pages/consulta/pages/modif-consulta/modif-consulta.component";

@NgModule ({        
    declarations:
        [RegistroConsultaComponent, ConsultaComponent, ModifConsultaComponent],
    imports: 
        [CommonModule, NavComponent, CommonModule, RouterLink, RouterLinkActive, FormsModule],

})

export class consultaModule {

}