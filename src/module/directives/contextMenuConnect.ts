import { Directive, Input, OnChanges, HostListener, ElementRef } from '@angular/core';
import { ContextMenuComponent } from '../components/contextMenu/contextMenu';

@Directive({
    selector: '[xnContextMenuConnect]',
})
export class ContextMenuConnectDirective {

    @Input()
    public xnContextMenuConnect: ContextMenuComponent;

    @Input()
    public context: any;

    constructor(private _elementRef: ElementRef) {
    }


    @HostListener('document:contextmenu', ['$event'])
    public documentRClick(event: any): boolean {
        event.preventDefault();
        const clickedInside = this._elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            return;
        }
        this.xnContextMenuConnect.show(event.clientX, event.clientY, this.context);
        return false;
    }

}
