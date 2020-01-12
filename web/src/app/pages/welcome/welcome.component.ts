import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/provider/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    options: AnimationOptions = {
        path: '../../../assets/animations/welcome.json',
        autoplay: true,
        loop: true
    }; // 50 à 218

    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
    }

    public connectViaGoogle() {
        this.auth.doGoogleLogin()
        .then((user) => {
            console.log('Success');
            console.log(user);
            localStorage.setItem('google', JSON.stringify(user));
        })
        .catch((err) => {
            console.log('Error');
            console.log(err);
        });
    }

    public connectViaFacebook() {
        
    }

}
