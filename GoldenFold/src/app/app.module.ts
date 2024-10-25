import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { KeycloakAngularModule } from 'keycloak-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';  // Importa el SharedModule
import { InicioComponent } from './pages/inicio/inicio.component';

import { DialogActualizarHabitacionComponent } from './components/Formularios/Habitacion/dialog-actualizar-habitacion/dialog-actualizar-habitacion.component';
import { EpisodisMedicsComponent } from './pages/inicio/pages/administrador-sistema/pages/episodis-medics/episodis-medics.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
//import { PlantesComponent } from './pages/inicio/pages/administrador-sistema/pages/plantes/plantes.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCrearHabitacionComponent } from './formularios/Habitacion/dialog-crear-habitacion/dialog-crear-habitacion/dialog-crear-habitacion.component';

@NgModule({
  declarations: [
    //PlantesComponent
    DialogActualizarHabitacionComponent,
    DialogCrearHabitacionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    SharedModule, 
    MatDatepickerModule,
    MatNativeDateModule ,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },],
  bootstrap: [InicioComponent]  // Asegúrate de hacer bootstrap AppComponent
})
export class AppModule { }
