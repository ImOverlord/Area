import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Event, ActivationStart, ParamMap } from '@angular/router';
import { FirebaseApp } from 'angularfire2';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.scss']
})
export class OAuthComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private firebase: FirebaseApp
    ) {
        // router.events.subscribe((event: Event) => {

        // });
        this.route.paramMap.toPromise()
        .then((params: ParamMap) => {
            let serviceName = params.get('name');

            console.log(serviceName);
        })
        .catch((err) => {
            console.log(err);
        });
        // this.route.paramMap.subscribe((params: ParamMap) => {
        // });
        route.queryParams
        .subscribe((params: Params) => {
            console.log(`Code: ${params.code}`);
            localStorage.setItem('github', params.code);
            this.firebase.firestore().collection('User')
            .where('idUser', '==', JSON.parse(localStorage.getItem('user')).uid)
            .get()
            .then(snapshot => {
                const tmp = [];
                console.log(tmp);

                if (snapshot.empty) {
                    tmp.push(localStorage.getItem('github'));
                    return this.firebase.firestore()
                        .collection('User')
                        .doc()
                        .set({
                        idUser: JSON.parse(localStorage.getItem('user')).uid,
                        Github: {
                            access_token: params.code,
                            scope: 'admin:repo_hook,repo',
                            token_type: 'bearer'
                        }
                        });
                } else {
                    if (
                        snapshot.docs[0].data().Github &&
                        snapshot.docs[0].data().Github.access_token
                    )
                        tmp.push(...snapshot.docs[0].data().Github.access_token);
                    if (!tmp.includes(localStorage.getItem('github'))) tmp.push(localStorage.getItem('github'));
                    return this.firebase.firestore()
                        .collection('User')
                        .doc(snapshot.docs[0].id)
                        .update({
                            idUser: JSON.parse(localStorage.getItem('user')).uid,
                            Github: {
                                access_token: params.code,
                                scope: 'admin:repo_hook,repo',
                                token_type: 'bearer'
                            }
                        });
                }
            });

            // for (const state of Object.keys(CREATE_STATE)) {
            //     if (params.hasOwnProperty(CREATE_STATE[state]))
            //         this.currentState = state as CREATE_STATE;
            // }
            // console.log(this.currentState);
            // if (this.currentState === CREATE_STATE.IF_DATA && this.builder.getActionFormResponses() === null)
            //     this.currentState = CREATE_STATE.IF;
            // if (this.currentState === CREATE_STATE.ELSE_DATA && this.builder.getReactionFormResponses() === null)
            //     this.currentState = CREATE_STATE.ELSE;
        });
    }

    ngOnInit() {

    }

}
