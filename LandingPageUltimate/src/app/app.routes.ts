import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { WhoComponent } from './features/who/who.component';
import { BbddComponent } from './features/bbdd/bbdd.component';
import { MockupComponent } from './features/mockup/mockup.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'who', component: WhoComponent },
    { path: 'bbdd', component: BbddComponent },
    { path: 'mockup', component: MockupComponent },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        redirectTo: 'landing',
        pathMatch:'full'
    }
];
