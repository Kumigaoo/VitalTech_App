import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './models/consulta/consulta.component';
import { ModifConsultaComponent } from './formularis/modif-consulta/modif-consulta.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const routes: Routes = [
  { path: 'consultas', component: ConsultaComponent },
  { path: 'modif-consulta/:id', component: ModifConsultaComponent }, 

];
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: ["localhost:5001/api/auth"]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  
})
export class AppModule { }
