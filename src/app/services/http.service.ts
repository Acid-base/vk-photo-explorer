import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { UserService }   from './user.service';
import { api }           from '../shared/api';

@Injectable()
export class HttpService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = api.host;
    private user = this.userService.getUser();
    constructor(private http: Http,
                private userService: UserService) { }

    getAlbums(): Promise<any> {
        const url = `${this.host}/api/getAlbumsList.php`;
        const data = {
            methodName: 'photos.getAlbums',
            access_token: this.user.token
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response)
            .catch(this.handleError);
    }
    getAlbum(albumId: string): Promise<any> {
        const url = `${this.host}/api/getAlbumOffset.php`;
        const data = {
            methodName: 'photos.getAlbums',
            owner_id: this.user.id,
            album_id: albumId,
            access_token: this.user.token
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response[0])
            .catch(this.handleError);
    }
    getPhotos(albumId: string): Promise<any> {
        const url = `${this.host}/api/getAlbum.php`;
        const data = {
            methodName: 'photos.get',
            owner_id: this.user.id,
            album_id: albumId,
            access_token: this.user.token
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response)
            .catch(this.handleError);
    }
    getPhoto(albumId: string, photoId: string): Promise<any> {
        const url = `${this.host}/api/getPhoto.php`;
        const data = {
            methodName: 'photos.get',
            aid: albumId,
            pids: photoId,
            access_token: this.user.token
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response[0])
            .catch(this.handleError);
    }
    getUploadUrl(albumId: string): Promise<any> {
        const url = `${this.host}/api/getUploadServer.php`;
        const data = {
            methodName: 'photos.getUploadServer',
            album_id: albumId,
            access_token: this.user.token
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response)
            .catch(this.handleError);
    }
    upload(uploadUrl: string, file: string, fileName: string): Promise<any> {
        const url = `${this.host}/photoUpload.php`;
        const data = {
            file1: file,
            url: uploadUrl,
            file_name: fileName
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    save(responseData: any): Promise<any> {
        const url = `${this.host}/api/photoSave.php`;
        const data = {
            methodName: 'photos.save',
            album_id: responseData.aid,
            server: responseData.server,
            photos_list: responseData.photos_list,
            hash: responseData.hash,
            access_token: this.user.token
        };
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json().response)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }


    // getPhotos(albumId: string): Observable<any> {
    //     const data = {
    //         method: 'photos.get',
    //         userId: `uid=${this.user.id}`,
    //         albumId: `aid=${albumId}`,
    //         token: `&access_token=${this.user.token}`,
    //         cb: 'callback=JSONP_CALLBACK'
    //     };
    //     const url = `${this.host}/${data.method}?${data.userId}&${data.albumId}&${data.token}&${data.cb}`;
    //     return this.jsonp
    //         .get(url)
    //         .map(res => res.json().response)
    //         .catch(this.handleError);
    // }
    // getAlbums(): Observable<any> {
    //     const data = {
    //         method: 'photos.getAlbums',
    //         userId: `uid=${this.user.id}`,
    //         token: `&access_token=${this.user.token}`,
    //         cb: 'callback=JSONP_CALLBACK'
    //     };
    //     const url = `${this.host}/?${data.userId}&need_covers=1&${data.token}&${data.cb}`;
    //     return this.jsonp
    //         .get(url)
    //         .map(res => res.json().response)
    //         .catch(this.handleError);
    // }
    // getAlbum(albumId: string): Observable<any> {
    //     const data = {
    //         method: 'photos.getAlbums',
    //         userId: `uid=${this.user.id}`,
    //         albumId: `aid=${albumId}`,
    //         token: `&access_token=${this.user.token}`,
    //         cb: 'callback=JSONP_CALLBACK'
    //     };
    //     const url = `${this.host}/${data.method}?${data.userId}&${data.albumId}&${data.token}&${data.cb}`;
    //     return this.jsonp
    //         .get(url)
    //         .map(res => res.json().response[0])
    //         .catch(this.handleError);
    // }
    // getPhoto(albumId: string, photoId: string): Observable<any> {
    //     const data = {
    //         method: 'photos.get',
    //         userId: `uid=${this.user.id}`,
    //         albumId: `aid=${albumId}`,
    //         photoId: `pids=${photoId}`,
    //         token: `&access_token=${this.user.token}`,
    //         cb: 'callback=JSONP_CALLBACK'
    //     };
    //     const url = `${this.host}/${data.method}?${data.userId}&${data.albumId}&${data.photoId}&${data.token}&${data.cb}`;
    //     return this.jsonp
    //         .get(url)
    //         .map(res => res.json().response[0])
    //         .catch(this.handleError);
    // }
    // getUploadUrl(albumId: string): Observable<any> {
    //     const data = {
    //         method: 'photos.getUploadServer',
    //         userId: `uid=${this.user.id}`,
    //         albumId: `aid=${albumId}`,
    //         token: `&access_token=${this.user.token}`,
    //         cb: 'callback=JSONP_CALLBACK'
    //     };
    //     const url = `${this.host}/${data.method}?${data.userId}&${data.albumId}&${data.token}&${data.cb}`;
    //     return this.jsonp
    //         .get(url)
    //         .map(res => res.json().response)
    //         .catch(this.handleError);
    // }
}
