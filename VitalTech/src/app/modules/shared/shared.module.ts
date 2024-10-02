import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "../../components/nav/nav.component";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { EnumTranslatePipe } from "../../pipes/enum-translate.pipe";

@NgModule ({
    declarations: [EnumTranslatePipe],
    imports: 
        [CommonModule , ReactiveFormsModule, NavComponent, RouterLinkActive, FormsModule, RouterLink, RouterModule ],
    exports:
        [CommonModule, ReactiveFormsModule, NavComponent, RouterLinkActive, FormsModule, RouterLink, RouterModule,EnumTranslatePipe ]

})


export class SharedModule {

}