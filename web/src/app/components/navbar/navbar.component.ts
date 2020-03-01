import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/provider/auth.service';
import { Router } from '@angular/router';

import { authConfig } from './auth';
import { OAuthService, JwksValidationHandler, NullValidationHandler } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router,
        private oauth: OAuthService
    ) { }

    ngOnInit() {
    }

    public disconnect() {
        this.auth.disconnect()
        .then(() => {
            this.router.navigate(['']);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    login() {
        this.oauth.configure(authConfig);
        this.oauth.tokenValidationHandler = new NullValidationHandler(); // JwksValidationHandler();
        this.oauth.loadDiscoveryDocumentAndTryLogin();
        this.oauth.initImplicitFlow();
    }

}
