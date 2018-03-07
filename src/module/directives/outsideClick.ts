import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[outsideClick]',
})
export class OutsideClickDirective {

    @Output()
    public outsideClick: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement): void {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.outsideClick.emit(null);
        }
    }
}
