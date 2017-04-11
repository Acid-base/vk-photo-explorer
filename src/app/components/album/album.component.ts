import { trigger, state, style, transition, animate } from '@angular/animations';

import { Component, OnInit }         from '@angular/core';
import { ActivatedRoute }            from '@angular/router';
import { Location }                  from '@angular/common';

import { HttpService, ToastService } from '../../services';

@Component({
    selector: 'album',
    templateUrl: 'album.component.html',
    styleUrls: ['album.component.scss'],
    animations: [
        trigger('album', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(300, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class AlbumComponent implements OnInit {
    album: any[];
    slicedAlbum: any[];
    title: string;
    idx: number;
    noPhotos: boolean;
    hidden = true;
    loading = false;
    scrollStep = 25;
    amount = +localStorage.getItem('amount') || 25;
    constructor(private location: Location,
                private route: ActivatedRoute,
                private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.getPhotos();
        this.getAlbum();
    }
    getAlbum(): void {
        this.route.params
            .switchMap(({ aid }) =>
                this.httpService
                    .getAlbum(aid))
                    .subscribe(
                        album => this.title = album.title || album.description,
                        error => this.toastService.showError(error));
    }
    getPhotos(): void {
        this.route.params
            .switchMap(({ aid }) =>
                this.httpService
                    .getPhotos(aid))
                    .subscribe(
                        album => {
                            this.album = album;
                            this.slicedAlbum = this.album.slice(0, this.amount);
                            localStorage.removeItem('amount');
                        },
                        error => this.toastService.showError(error)
                    );
    }
    loadPhotos(): void {
        if (this.amount > this.album.length) {
            this.noPhotos = true;
        } else {
            this.loading = true;
            setTimeout(() => {
                this.amount += this.scrollStep;
                this.slicedAlbum = this.album.slice(0, this.amount);
                this.loading = false;
            }, 750);
        }
    }
    showTooltip(index: number): void {
        this.hidden = false;
        this.idx = index;
    }
    hideTooltip(): void {
        this.hidden = true;
    }
    saveAmount(): void {
        localStorage.setItem('amount', JSON.stringify(this.amount));
    }
    goBack(): void {
        this.location.back();
    }
}
