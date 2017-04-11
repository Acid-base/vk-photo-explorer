import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { HttpModule }              from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }             from '@angular/forms';
import { ToastModule }             from 'ng2-toastr';
import { MomentModule }            from 'angular2-moment';
import { AppRoutingModule }        from './app-routing.module';

import { AppComponent } from './app.component';
import { directives }   from './directives';
import { components }   from './components';
import { services }     from './services';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MomentModule,
        ToastModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ...directives,
        ...components
    ],
    providers: [ ...services ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
