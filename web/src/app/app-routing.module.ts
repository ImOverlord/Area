import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RedirectGuardService } from './provider/redirect-guard.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'prefix',
        canActivate: [RedirectGuardService],
        data: {title: 'Sign in - AREA'}
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'prefix',
        canActivate: [RedirectGuardService],
        data: {title: 'Sign up - AREA'}
    },
    {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'prefix',
        canActivate: [RedirectGuardService],
        data: {title: 'Welcome - AREA'}
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
