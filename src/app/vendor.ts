import '@angular/platform-browser';
import '@angular/platform-browser/animations';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/forms';
import '@angular/animations';

import 'rxjs/Subject';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

if (process.env.ENV !== 'production') {
    require('@angular/platform-browser-dynamic');
    require('@angular/compiler');
}

import 'ng2-toastr';
import 'angular2-moment';
