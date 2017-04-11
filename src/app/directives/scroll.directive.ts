import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[infinityScroll]',
})
export class ScrollDirective {
    public el: HTMLUListElement;
    @Output() onScrollMethod = new EventEmitter();
    @HostListener('scroll', ['$event'])
    doSomething() {
        this.onScroll();
    }
    constructor(public element: ElementRef) {
        this.el = element.nativeElement;
    }
    onScroll(): void {
        if (this.el.scrollTop + this.el.clientHeight === this.el.scrollHeight) {
            this.onScrollMethod.emit();
        }
    }
}
