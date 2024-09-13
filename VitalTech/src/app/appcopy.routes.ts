import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'consulta', loadChildren: ()=> import('./models/consulta/consulta.routes')},
    {path: '', redirectTo: 'consulta', pathMatch: 'full'},

];

