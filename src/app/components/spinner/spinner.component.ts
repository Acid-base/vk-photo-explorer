import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styles: [`i {color: #0072aa}`]
})
export class SpinnerComponent implements OnInit {
    @Input() reset: boolean;
    loading: boolean;
    timeout: number;
    constructor() { }
    ngOnInit(): void {
        this.timeout = this.reset ? 0 : 1000;
        setTimeout(() => this.loading = true, this.timeout);
    }
}
