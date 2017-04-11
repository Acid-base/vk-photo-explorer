import { trigger, state, style, transition, animate } from '@angular/animations';

import { Component, OnInit }         from '@angular/core';
import { HttpService, ToastService } from '../../services';

@Component({
    selector: 'albums',
    templateUrl: 'albums.component.html',
    styleUrls: ['albums.component.scss'],
    animations: [
        trigger('albums', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class AlbumsComponent implements OnInit {
    albums: any[];
    constructor(private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.getAlbums();
    }
    getAlbums(): void {
        this.httpService
            .getAlbums()
            .then(res => {
                this.albums = res;
            })
            .catch(error => this.toastService.showError(error));
    }
}
