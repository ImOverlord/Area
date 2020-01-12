import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './provider/auth-guard.service';
import { RedirectGuardService } from './provider/redirect-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'prefix', canActivate: [RedirectGuardService] },
    { path: 'register', component: RegisterComponent, pathMatch: 'prefix', canActivate: [RedirectGuardService] },
    { path: 'home', component: HomeComponent, pathMatch: 'prefix', canActivate: [AuthGuardService] },
    { path: '', component: WelcomeComponent, pathMatch: 'prefix', canActivate: [RedirectGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
