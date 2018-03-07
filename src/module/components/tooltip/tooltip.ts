import { Component, Input, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'xn-tooltip',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
})
export class TooltipComponent {

    @Input()
    public tooltip: string;

    @HostBinding('class.open')
    @Input()
    public open = false;

    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('mouseleave')
    public onCloseTooltip(): void {
        this.open = false;
        this.openChange.emit(this.open);
    }

    @HostListener('mouseenter')
    public onOpenToolTip(): void {
        this.open = true;
        this.openChange.emit(this.open);
    }

}
