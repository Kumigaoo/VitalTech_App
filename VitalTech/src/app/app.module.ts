import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './modules/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class AppModule { }
