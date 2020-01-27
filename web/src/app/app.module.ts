import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ServiceComponent } from './pages/service/service.component';
import { AppCardComponent } from './components/app-card/app-card.component';

// import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        NavbarComponent,
        WelcomeComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        FooterComponent,
        ExploreComponent,
        ServiceCardComponent,
        ServiceComponent,
        AppCardComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        // OAuthModule,
        FlexLayoutModule,
        LottieModule.forRoot({ player: playerFactory }),
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        // DragDropModule
        // BrowserModule,
        // AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
