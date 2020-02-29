import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public userData: any = null;
    public accessToken = '';

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    public loginViaGoogle() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();

            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider)
            .then((result: firebase.auth.UserCredential) => {
                this.router.navigate(['home']);
                // @ts-ignore
                localStorage.setItem('google', result.credential.accessToken);
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    /**
     * Login the user
     * @param email user's email
     * @param password user's password
     */
    public login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.ngZone.run(() => {
                this.router.navigate(['home']);
            });
        });
    }

    /**
     * Register the user
     * @param email user's email
     * @param password user's password
     */
    public register(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Check if the user is authenticated
     */
    get isAuthenticated(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false;
    }

    /**
     * Disconnect the user
     */
    public disconnect() {
        return this.afAuth.auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                this.userData = null;
                localStorage.removeItem('google');
                this.router.navigate(['']);
        });
    }
}
