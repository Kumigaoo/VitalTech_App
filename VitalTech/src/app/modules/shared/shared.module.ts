import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "../../components/nav/nav.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@NgModule ({
    imports: 
        [CommonModule , ReactiveFormsModule, NavComponent, RouterLinkActive, FormsModule, RouterLink],
    exports:
        [CommonModule, ReactiveFormsModule, NavComponent, RouterLinkActive, FormsModule, RouterLink]

})


export class SharedModule {

}