import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/provider/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private isNavbarCollapsed = true;

    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
    }

}
