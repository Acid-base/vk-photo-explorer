import { trigger, state, style, transition, animate } from '@angular/animations';

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService  }      from '../../services';
import { api }               from '../../shared/api';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.scss'],
    animations: [
        trigger('welcome', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(750)
            ]),
        ])
    ]
})
export class WelcomeComponent implements OnInit {
    logged: boolean;
    clientId = 'client_id=5965407';
    host = 'https://oauth.vk.com/authorize';
    redirectUri = `redirect_uri=${api.redirectUri}`;
    scope = 'scope=65540';
    response = 'response_type=code';
    url = `${this.host}?${this.clientId}&display=page&${this.redirectUri}&${this.scope}&${this.response}&v=5.63`;
    constructor(private router: Router,
                private authService: AuthService) { }

    ngOnInit(): void {
        this.logged = this.authService.isLogged();
        this.logged && this.router.navigate(['/albums']);
    }
}
