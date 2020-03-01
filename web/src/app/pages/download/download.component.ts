import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        this.http.get('http://localhost:8080/client.apk', {responseType: 'blob'}).toPromise()
        .then(() => {
            this.router.navigateByUrl('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
