import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AuthService,
    UserService,
    ToastService
} from '../../services';

@Component({
    template: `<spinner></spinner>`
})
export class AuthComponent implements OnInit {
    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.getUser();
        this.authService.isLogged() && this.router.navigate(['albums']);
    }
    getUser(): void {
        this.route.queryParams
            .subscribe(param => {
                let code = param['code'];
                this.getToken(code)
                    .then(data => this.getUserInfo(data, data.user_id))
                    .catch(error => this.toastService.showError(error));
            });
    }
    getToken(code: string): Promise<any> {
        return this.authService.getToken(code);
    }
    getUserInfo(data: any, id: string): void {
        this.userService
            .getUserInfo(id)
            .then(info => {
                const user = {
                    name: info.first_name,
                    token: data.access_token,
                    id: id
                };
                localStorage.setItem('vk-user', JSON.stringify(user));
                this.router.navigate(['albums']);
            })
            .catch(error => this.toastService.showError(error));
    }
}
