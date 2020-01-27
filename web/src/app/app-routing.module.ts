import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './provider/auth-guard.service';
import { RedirectGuardService } from './provider/redirect-guard.service';
import { ExploreComponent } from './pages/explore/explore.component';
import { ServiceComponent } from './pages/service/service.component';

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
        path: 'home',
        component: HomeComponent,
        pathMatch: 'prefix',
        canActivate: [AuthGuardService],
        data: {title: 'My services - AREA'}
    },
    {
        path: 'explore',
        component: ExploreComponent,
        pathMatch: 'prefix',
        canActivate: [AuthGuardService],
        data: {title: 'Discover - AREA'}
    },
    {
        path: 'service/:name',
        component: ServiceComponent,
        pathMatch: 'prefix',
        canActivate: [AuthGuardService],
        data: {title: 'Service Email - AREA'}
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
