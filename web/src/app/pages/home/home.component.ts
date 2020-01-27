import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/provider/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IService } from 'src/app/models/IService';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public services: IService[] = [];

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        this.services.push({
            url: '../../../assets/icons/email.png',
            id: 'email',
            title: 'Email'
        });
    }

    ngOnInit() {

    }

    add() {
        this.services.push({
            url: '../../../assets/icons/email.png',
            id: 'email',
            title: 'Email'
        });
    }

    trackByFn(index, item) {
        return index; // or item.id
    }
}
