import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { KeycloakAngularModule } from 'keycloak-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';  // Importa el SharedModule
import { InicioComponent } from './pages/inicio/inicio.component';
import { DialogActualizarHabitacionComponent } from './components/dialog-formulario/dialog-actualizar-habitacion/dialog-actualizar-habitacion/dialog-actualizar-habitacion.component';
//import { PlantesComponent } from './pages/inicio/pages/administrador-sistema/pages/plantes/plantes.component';

@NgModule({
  declarations: [
    //PlantesComponent
  
    DialogActualizarHabitacionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    SharedModule  // Asegúrate de incluir el SharedModule aquí
  ],
  providers: [],
  bootstrap: [InicioComponent]  // Asegúrate de hacer bootstrap AppComponent
})
export class AppModule { }
