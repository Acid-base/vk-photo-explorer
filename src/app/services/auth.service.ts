import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { UserService }   from './user.service';
import { api }           from '../shared/api';

@Injectable()
export class AuthService {
    private logged: boolean;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = api.host;
    private redirectUri = api.redirectUri;
    constructor(private http: Http,
                private userService: UserService) {
                this.isLogged();
    }

    getToken(code: string): Promise<any> {
        const url = `${this.host}/api/getAccessToken.php`;
        const data = {
            redirect_uri: this.redirectUri,
            code: code
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    isLogged(): boolean {
        this.logged = !!this.userService.getUser() && !!this.userService.getUser().id;
        return this.logged;
    }
    logout(): void {
        localStorage.removeItem('vk-user');
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
