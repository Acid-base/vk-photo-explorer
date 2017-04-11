import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {
    AuthService,
    UserService,
    ToastService
}               from '../../services';
import { User } from '../../shared/user.model';

@Component({
    selector: 'auth-profile',
    templateUrl: 'auth-profile.component.html',
    styles: [`a { color: #ddd; padding-left: .5rem; cursor: pointer }
              span { user-select: none }`
    ]
})
export class AuthProfileComponent implements OnInit {
    profile: User;
    constructor(private router: Router,
                private userService: UserService,
                private authService: AuthService,
                public toastService: ToastService) { };

    ngOnInit(): void {
        this.login();
    }
    login(): void {
        this.profile = this.userService.getUser();
    }
    logout(): void {
        this.authService.logout();
        this.router.navigate(['/welcome']);
    }
}
