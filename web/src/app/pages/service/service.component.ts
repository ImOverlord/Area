import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutesRecognized, Router, RouterLink, ActivatedRoute, ParamMap } from '@angular/router';
import { IService } from 'src/app/models/IService';
import { IServiceContent } from 'src/app/models/IServiceContent';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    private sub;

    private service: IServiceContent;

    ngOnInit() {
        this.service = {
            id: 'email',
            title: 'Email',
            url: '../../../assets/icons/email.png',
            desc: `Send and receive important information when you need it, automatically, with this service. The "send me an email" action has a daily limit of 750 messages per day, at which point Applets will be paused until the limit resets at 12:00 AM GMT. `,
            apps: [
                {
                    author: 'Patrick',
                    color: 'black',
                    downloads: 20,
                    title: 'Custom Response from Google Home!'
                },
                {
                    author: 'Patrick',
                    color: 'black',
                    downloads: 20,
                    title: 'Custom Response from Google Home!'
                },
                {
                    author: 'Patrick',
                    color: 'black',
                    downloads: 20,
                    title: 'Custom Response from Google Home!'
                },
                {
                    author: 'Patrick',
                    color: 'black',
                    downloads: 20,
                    title: 'Custom Response from Google Home!'
                },
                {
                    author: 'Patrick',
                    color: 'black',
                    downloads: 20,
                    title: 'Custom Response from Google Home!'
                },
                {
                    author: 'Patrick',
                    color: 'black',
                    downloads: 20,
                    title: 'Custom Response from Google Home!'
                }
            ]
        };
        this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
            console.log(params.get('name'));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
