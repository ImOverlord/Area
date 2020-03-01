import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { MessagingService } from '../app/provider/messaging/messaging.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public message: any;

    constructor(
        router: Router,
        title: Title,
        private oauthService: OAuthService,
        private messagingService: MessagingService
    ) {
        router.events.subscribe((event: Event) => {
            if (event instanceof ActivationStart) {
                if (event.snapshot.data.hasOwnProperty('title'))
                    title.setTitle(event.snapshot.data.title);
                else
                    title.setTitle('AREA');
            }
        });
        oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

        // Load information from Auth0 (could also be configured manually)
        oauthService.loadDiscoveryDocument()
    
          // See if the hash fragment contains tokens (when user got redirected back)
          .then(() => oauthService.tryLogin())
    
          // If we're still not logged in yet, try with a silent refresh:
          .then(() => {
            if (!oauthService.hasValidAccessToken()) {
              return oauthService.silentRefresh();
            }
          })
    
          // Get username, if possible.
          .then(() => {
            if (oauthService.getIdentityClaims()) {
              console.log(oauthService.getIdentityClaims());
            }
          });
        oauthService.setupAutomaticSilentRefresh();
    }

    ngOnInit() {
      this.messagingService.receiveMessage();
      // this.message 
      this.message = this.messagingService.currentMessage;
    }
}
