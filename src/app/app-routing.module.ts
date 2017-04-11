import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './services';

import {
    WelcomeComponent,
    AuthComponent,
    AlbumsComponent,
    AlbumComponent,
    PhotoComponent,
    UploadComponent,
    NotFoundComponent,

} from './components';

const routes: Routes = [
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'albums',
        component: AlbumsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'album/:aid',
        component: AlbumComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'album/:aid/photo/:pid',
        component: PhotoComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
