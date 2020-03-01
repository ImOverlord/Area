import { Component } from '@angular/core';
import { Router, Event, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        router: Router,
        title: Title
    ) {
        router.events.subscribe((event: Event) => {
            if (event instanceof ActivationStart) {
                if (event.snapshot.data.hasOwnProperty('title'))
                    title.setTitle(event.snapshot.data.title);
                else
                    title.setTitle('AREA');
            }
        });
    }

}
