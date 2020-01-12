import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
// import { AngularFireAuth, AngularFireDatabase, FirebaseAuthState, AuthProviders, AuthMethods, AngularFire } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
// import Catch from 'catch-decorator';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public userData: any = null; // Save logged in user data
    // public userData: Observable<firebase.User>;
    private logged = false;
    public accessToken = '';

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                console.log('CONNECTED');
                console.log(user);
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
        // angularFireAuth.auth.subscribe((auth) => {
        //     this.authState = auth;
        // });
        // this.userData = angularFireAuth.authState;
        // this.angularFireAuth.auth.onAuthStateChanged((user: firebase.User) => {
        //     if (user) {
        //         this.logged = true;
        //     } else {
        //         this.logged = false;
        //     }
        //   });
        // console.log(this.angularFireAuth.auth.currentUser);
    }

    public doGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            // let provider = new firebase.auth.GoogleAuthProvider();

            // provider.addScope('repo');
            // this.afAuth.auth
            // .signInWithPopup(provider)
            // .then(res => {
            //     resolve(res);
            // }, err => {
            //     console.log(err);
            //     reject(err);
            // });
            let provider = new firebase.auth.GoogleAuthProvider();

            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider)
            .then((result) => {
                resolve(result);
                // This gives you a Google Access Token.
                // let token = result.credential.accessToken;
                // // The signed-in user info.
                // let user = result.user;
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    // public getCurrentUser() {
    //     return new Promise<any>((resolve, reject) => {
    //         let user = this.angularFireAuth.auth.onAuthStateChanged((usr) => {
    //             if (usr) {
    //                 resolve(usr);
    //             } else {
    //                 reject('No user logged in');
    //             }
    //         });
    //     });
    // }

    ////////////////////////
      // Sign in with email/password
    public login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      /*.catch((error) => {
        window.alert(error.message);
      });*/
  }

  // Sign up with email/password
    public register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      });
      /*.catch((error) => {
        window.alert(error.message);
      });*/
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
        this.router.navigate(['verify-email-address']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
        window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
        window.alert(error);
    });
  }

  // Returns true when user is looged in and email is verified
  get isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('My user');
    // console.log(user);
    return (user !== null) ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // const userData: User = {
    //     uid: user.uid,
    //     email: user.email,
    //     displayName: user.displayName,
    //     photoURL: user.photoURL,
    //     emailVerified: user.emailVerified
    // };
    // return userRef.set(userData, {
    //   merge: true
    // });
  }

  // Sign out
    public disconnect() {
    return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.userData = null;
        this.router.navigate(['']);
    });
  }

}
