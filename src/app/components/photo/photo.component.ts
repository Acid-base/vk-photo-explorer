import { trigger, state, style, transition, animate } from '@angular/animations';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import {
    HttpService,
    UserService,
    ToastService
}               from '../../services';
import { User } from '../../shared/user.model';

@Component({
    selector: 'photo',
    templateUrl: 'photo.component.html',
    styleUrls: ['photo.component.scss'],
    animations: [
        trigger('photo', [
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
export class PhotoComponent implements OnInit {
    user: User;
    photo: any;
    src: string;
    width: number;
    filename: string;
    constructor(private location: Location,
                private route: ActivatedRoute,
                private userService: UserService,
                private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.getPhoto();
        this.getUser();
    }
    getPhoto(): void {
        this.route.params
            .switchMap(({ aid, pid }) =>
                this.httpService
                    .getPhoto(aid, pid))
                    .subscribe(
                        photo => {
                            this.photo = photo;
                            this.getPhotoBySize(photo);
                            this.filename = this.src.split('/').slice(-1)[0];
                        },
                        error => this.toastService.showError(error)
            );
    }
    getPhotoBySize(photo: any): void {
        this.width = window.innerWidth;
        let large: string;
        let medium: string;
        let small: string;

        photo.sizes.forEach(item => {
            if (item.type === 'z') {
                large = item.src;
            } else if (item.type === 'y') {
                medium = item.src;
            } else if (item.type === 'x') {
                small = item.src;
            }
        });
        this.selectSize(large, medium, small);
    }
    selectSize(large: string, medium: string, small: string): void {
        if (this.width > 1200) {
            this.src = large || medium || small;
        } else if (this.width >= 900 && this.width <= 1200) {
            this.src = medium || small;
        } else if (this.width < 900) {
            this.src = small;
        }
    }
    getUser(): void {
        this.user = this.userService.getUser();
    }
    goBack(): void {
        this.location.back();
    }
}
