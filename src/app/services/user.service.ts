import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from '../shared/user.model';
import { api }  from '../shared/api';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = api.host;
    constructor(private http: Http) { }

    getUserInfo(id: string): Promise<any> {
        const url = `${this.host}/api/getUserInfo.php`;
        const data = {
            methodName: 'users.get',
            user_ids: id
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response[0])
            .catch(this.handleError);
    }
    getUser(): User {
        const user = localStorage.getItem('vk-user');
        return JSON.parse(user);
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
