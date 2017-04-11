import { Component, OnInit, DoCheck, ViewContainerRef } from '@angular/core';
import { ToastsManager }                                from 'ng2-toastr/ng2-toastr';
import { AuthService }                                  from './services';

import '../../public/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck  {
    title = 'Photo service';
    logged: boolean;
    constructor(private authService: AuthService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
                toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void {
        this.logged = this.authService.isLogged();
    }
    ngDoCheck(): void {
        this.logged = this.authService.isLogged();
    }
}
