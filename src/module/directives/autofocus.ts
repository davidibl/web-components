import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[autofocus]',
})
export class AutofocusDirective implements AfterViewInit {

    @Input()
    public autofocus = false;

    constructor(private element: ElementRef) { }

    public ngAfterViewInit() {
        if (this.autofocus) {
            setTimeout(() => {
                this.element.nativeElement.focus();
            }, 1);
        }
    }
}
