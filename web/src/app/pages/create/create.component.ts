import { Component, OnInit } from '@angular/core';
import { BuilderService } from 'src/app/provider/builder/builder.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseTemplate } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthConfig, OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from 'src/app/provider/auth.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    private currentState: CREATE_STATE = CREATE_STATE.INIT;

    constructor(
        private builder: BuilderService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private firebase: FirebaseApp,
        private afAuth: AngularFireAuth,
        private oauthService: OAuthService,
        private angularFireMessaging: AngularFireMessaging,
        private authService: AuthService
    ) {
        route.queryParams
        .subscribe((params: Params) => {
            for (const state of Object.keys(CREATE_STATE)) {
                if (params.hasOwnProperty(CREATE_STATE[state]))
                    this.currentState = state as CREATE_STATE;
            }
            console.log(this.currentState);
            if (this.currentState === CREATE_STATE.IF_DATA && this.builder.getActionFormResponses() === null)
                this.currentState = CREATE_STATE.IF;
            if (this.currentState === CREATE_STATE.ELSE_DATA && this.builder.getReactionFormResponses() === null)
                this.currentState = CREATE_STATE.ELSE;
        });
    }

    ngOnInit() {
    }

    setState(state: CREATE_STATE) {
        const queryParams = {};

        queryParams['' + state.toString()] = '';
        this.router.navigate(['.'], { relativeTo: this.route, queryParams});
    }

    chooseAction(index: number) {
        // console.log("oauth2");
        // const authConfig: AuthConfig = {
        //     // Url of the Identity Provider
        //     issuer: 'https://slack.com/oauth/v2/authorize',
        //     // URL of the SPA to redirect the user to after login
        //     redirectUri: window.location.origin + '/',
        //     // The SPA's id. The SPA is registered with this id at the auth-server
        //     clientId: '645826239602.957881164305',
        //     // set the scope for the permissions the client should request
        //     // The first three are defined by OIDC. The 4th is a usecase-specific one
        //     scope: 'chat write',
        // };
        // this.oauthService.configure(authConfig);
        // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //////////////////
    // var provider = new firebase.auth.OAuthProvider('slack');
    // provider.addScope('profile');
    // provider.addScope('email');
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    // // This gives you the OAuth Access Token for that provider.
    // var token = (result.credential as any).accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // });
        // const provider = new firebase.auth.GoogleAuthProvider();
        // const p = firebase.auth.OAuthProvider('slack');
    /**
     * Sets the OAuth custom parameters to pass in an OAuth request for popup
     * and redirect sign-in operations.
     * For a detailed list, check the
     * reserved required OAuth 2.0 parameters such as `client_id`, `redirect_uri`,
     * `scope`, `response_type` and `state` are not allowed and will be ignored.
     * @param customOAuthParameters The custom OAuth parameters to pass
     *     in the OAuth request.
     */
    // setCustomParameters(
    //     customOAuthParameters: Object
    //   ): firebase.auth.AuthProvider;
        // const p = new firebase.auth.AuthProvider
        // provider.addScope('profile');
        // provider.addScope('email');
        // firebase.auth().signInWithCustomToken()
        // firebase.auth().signInWithPopu
        // this.doAuthorization(
        //     'https://slack.com/oauth/v2/authorize?client_id=645826239602.957881164305&scope=chat:write&redirect_uri=http://localhost:8081/oauth/slack',
        //     'Slack',
        //     true
        // );
        // firebase.auth().
        // let provider = new firebase.auth.GithubAuthProvider();
        // let p = new firebase.auth.OAuthProvider('google');
        // firebase.auth().signInWithRedirect(provider);
        this.builder.setAction(index);
        console.log('Changed the state');
        console.log(this.builder.getAction());
        this.setState(CREATE_STATE.IF_CHOOSE);
    }

    chooseActionTrigger(index: number) {
        this.builder.setActionTrigger(index);
        this.setState(CREATE_STATE.IF_DATA);
    }

    chooseReaction(index: number) {
        this.builder.setReaction(index);
        this.setState(CREATE_STATE.ELSE_CHOOSE);
    }

    chooseReactionTrigger(index: number) {
        console.log("Choose reaction trigger");
        this.builder.setReactionTrigger(index);
        this.setState(CREATE_STATE.ELSE_DATA);
    }

    public canValidate(): boolean {
        if (this.currentState.toLowerCase() === CREATE_STATE.IF_DATA.toLowerCase()
            && this.builder.getActionFormResponses() !== null) {
            for (const key of Object.keys(this.builder.getActionFormResponses()))
                if (this.builder.getActionFormResponses()[key].length === 0)
                    return false;
        } else if (this.currentState.toLowerCase() === CREATE_STATE.ELSE_DATA.toLowerCase()
            && this.builder.getReactionFormResponses() !== null) {
            for (const key of Object.keys(this.builder.getReactionFormResponses()))
                if (this.builder.getReactionFormResponses()[key].length === 0)
                    return false;
        } else
            return false;
        return true;
    }

    trackByFn(index, item) {
        return index; // or item.id
    }

    debug(obj) {
        // console.log(obj);
    }

    public sendData() {
        this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
            console.log({
                actionName: this.builder.currentAction.name,
                actionData: this.builder.actionFormResponses,
                reactionName: this.builder.currentReaction.name,
                reactionData: this.builder.reactionFormResponses,
                headers: {
                    authorization: idToken
                }
            });
            return this.http.put('/subscribe/', {
                    actionName: this.builder.actionForm[this.builder.actionTriggerId].slugName,
                    actionData: this.builder.actionFormResponses,
                    reactionName: this.builder.reactionForm[this.builder.reactionTriggerId].slugName,
                    reactionData: this.builder.reactionFormResponses,
                }, {
                    headers: {
                        authorization: idToken
                    }
                }).toPromise();
        })
        .then((body) => {
            this.router.navigateByUrl('/');
            console.log("Sent the data");
            console.log(body);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    ///////
    // authorization code and tokens
    authorizationCode: string;
    oAuthToken: string;
    oAuthVerifier: string;

    // popup related
    private windowHandle: Window;   // reference to the window object we will create    
    private intervalId: any = null;  // For setting interval time between we check for authorization code or token
    private loopCount = 600;   // the count until which the check will be done, or after window be closed automatically.
    private intervalLength = 100;   // the gap in which the check will be done for code.

    doAuthorization(url: string, socialMediaProvider: string, isRegisterAction: boolean) {  
        /* isRegisterAction flag i am using to check if the process is for registration or Login */
        /* socialMediaProvider is for name of social media , it is optional*/
            
        // let loopCount = this.loopCount;

        /* Create the window object by passing url and optional window title */
            // ouvre une fenetre sans barre d'etat, ni d'ascenceur
        // let w = open("", 'popup','width=400,height=200,toolbar=no,scrollbars=no,resizable=yes');	
        // const options = `width=400,height=200,left=${left},top=${top}`;
        // w.document.write("<title>"+document.forms["f_popup"].elements["titre"].value+"</title>");
        // w.document.write("<body> Bonjour "+document.forms["f_popup"].elements["nom"].value+"<br><br>");
        // w.document.write("Ce popup n'est pas un fichier HTML, ");
        // w.document.write("il est écrit directement par la fenêtre appelante");
        // w.document.write("</body>");
        // w.document.close();
        return;
        let w = open(url, 'OAuth Login', 'width=400,height=200,toolbar=no,scrollbars=no,resizable=yes');
        // w.alert('salut');
        // Ceci ne fait rien, en supposant que la fenêtre n'a pas changé d'adresse.
        w.postMessage('salut', 'https://localhost:8081');
        window.addEventListener('message', (event) => {
            console.log("Received:");
            console.log(event);
        }, false);
        return;
        this.windowHandle = this.createOauthWindow(url, 'OAuth login');
        let This = this;
        console.log(this.windowHandle);
        // return;
        // const getQueryString = function(field: any, url: string) {
        //     const windowLocationUrl = url;
        //     const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        //     const string = reg.exec(windowLocationUrl);
        //     return string ? string[1] : null;
        // };

        timeout();
        function timeout() {
            setTimeout(() => {
                console.log("Inside");
                // if (This.windowHandle)
                // console.log(This.windowHandle.location);
                let url: string = '';

                try {
                    console.log(This.windowHandle);//.options[l.options.selectedIndex])
                    console.log("Got the real url");
                    url = This.windowHandle.location.href;
                } catch(err) {
                    console.log("Failed to retrieve the url");
                    console.log(err);
                }
                // if (getQueryString("code", url) !== null) {
                if (url.indexOf('code') !== -1) {
                    console.log("Got the code !");
                    This.windowHandle.close();
                } else {
                    console.log("Don't have the code");
                    timeout();
                }
            }, 1000);
        }
    }
  /* Now start the timer for which the window will stay, and after time over window will be closed */
    // this.intervalId = window.setInterval(() => {
    //     if (loopCount-- < 0) {
    //     window.clearInterval(this.intervalId);
    //     this.windowHandle.close();
    //     } else {
    //         let href: string;  // For referencing window url
    //         try {
    //         href = this.windowHandle.location.href; // set window location to href string
    //         } catch (e) {
    //         // console.log('Error:', e); // Handle any errors here
    //         }
    //         if (href != null) {
                            
    //         // Method for getting query parameters from query string
    //         const getQueryString = function(field: any, url: string) {
    //         const windowLocationUrl = url ? url : href;
    //         const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    //         const string = reg.exec(windowLocationUrl);
    //         return string ? string[1] : null;
    //         };
    //         /* As i was getting code and oauth-token i added for same, you can replace with your expected variables */
    //         if (href.match('code')) {
    //         // for google , fb, github, linkedin
    //         window.clearInterval(this.intervalId);
    //         this.authorizationCode = getQueryString('code', href);
    //         console.log("Code: ");
    //         console.log(this.authorizationCode);
    //         this.windowHandle.close();
    //         if (isRegisterAction) {
    //             /* call signup method */
    //         } else {
    //             /* call login method */
    //         }
    //         } else if (href.match('oauth_token')) {
    //         // for twitter
    //         window.clearInterval(this.intervalId);
    //         this.oAuthToken = getQueryString('oauth_token', href);
    //         this.oAuthVerifier = getQueryString('oauth_verifier', href);
    //         this.windowHandle.close();
    //         if (isRegisterAction) {
    //             /* call signup */
    //         } else {
    //             /* call login */
    //         }
    //         }
    //     }
    //     }
    // }, this.intervalLength);
    // }

    createOauthWindow(url: string, name = 'Authorization', width = 500, height = 600, left = 0, top = 0) {
        if (url == null) {
            return null;
        }
        const options = `width=${width},height=${height},left=${left},top=${top}`;
        return window.open(url, name, options);
    }
}

enum CREATE_STATE {
    INIT = '',
    IF = 'if',
    IF_CHOOSE = 'if_choose',
    IF_DATA = 'if_data',
    ELSE = 'else',
    ELSE_CHOOSE = 'else_choose',
    ELSE_DATA = 'else_data'
}
