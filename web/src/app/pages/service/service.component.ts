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
        // this.service = {
        //     id: 'email',
        //     title: 'Email',
        //     url: '../../../assets/icons/email.png',
        //     description: `Send and receive important information when you need it, automatically, with this service. The "send me an email" action has a daily limit of 750 messages per day, at which point Applets will be paused until the limit resets at 12:00 AM GMT. `,
        //     apps: [
        //         {
        //             author: 'Patrick',
        //             color: 'black',
        //             downloads: 20,
        //             title: 'Custom Response from Google Home!'
        //         },
        //         {
        //             author: 'Patrick',
        //             color: 'black',
        //             downloads: 20,
        //             title: 'Custom Response from Google Home!'
        //         },
        //         {
        //             author: 'Patrick',
        //             color: 'green',
        //             downloads: 20,
        //             title: 'Custom Response from Google Home!'
        //         },
        //         {
        //             author: 'Patrick',
        //             color: 'black',
        //             downloads: 20,
        //             title: 'Custom Response from Google Home!'
        //         },
        //         {
        //             author: 'Patrick',
        //             color: 'black',
        //             downloads: 20,
        //             title: 'Custom Response from Google Home!'
        //         },
        //         {
        //             author: 'Patrick',
        //             color: 'black',
        //             downloads: 20,
        //             title: 'Custom Response from Google Home!'
        //         }
        //     ]
        // };
        // this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
        //     let serviceName = params.get('name');
        //     /** @TODO Retrieves service info */

        //     let services: IServiceContent[] = [
        //     {
        //         id: 'email',
        //         title: 'Email',
        //         url: '../../../assets/icons/email.png',
        //         description: `Send and receive important information when you need it, automatically, with this service. The "send me an email" action has a daily limit of 750 messages per day, at which point Applets will be paused until the limit resets at 12:00 AM GMT. `,
        //         apps: [
        //             {
        //                 author: 'Patrick',
        //                 color: 'black',
        //                 downloads: 20,
        //                 title: 'Custom Response from Google Home!'
        //             },
        //             {
        //                 author: 'Patrick',
        //                 color: 'black',
        //                 downloads: 20,
        //                 title: 'Custom Response from Google Home!'
        //             },
        //             {
        //                 author: 'Patrick',
        //                 color: 'green',
        //                 downloads: 20,
        //                 title: 'Custom Response from Google Home!'
        //             },
        //             {
        //                 author: 'Patrick',
        //                 color: 'black',
        //                 downloads: 20,
        //                 title: 'Custom Response from Google Home!'
        //             },
        //             {
        //                 author: 'Patrick',
        //                 color: 'black',
        //                 downloads: 20,
        //                 title: 'Custom Response from Google Home!'
        //             },
        //             {
        //                 author: 'Patrick',
        //                 color: 'black',
        //                 downloads: 20,
        //                 title: 'Custom Response from Google Home!'
        //             }
        //         ]
        //     },
        //     {
        //         id: 'letter',
        //         title: 'Letter',
        //         url: '../../../assets/icons/email.png',
        //         description: `laposte represente`,
        //         apps: [
        //             {
        //                 author: 'Julien T',
        //                 color: 'black',
        //                 downloads: 500,
        //                 title: 'Link letters with email'
        //             }
        //         ]
        //     }];

        //     for (const s of services) {
        //         if (serviceName === s.id) {
        //             this.service = s;
        //             break;
        //         }
        //     }
        //     console.log(serviceName);
        // });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
