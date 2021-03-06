import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'xn-popup-button',
    templateUrl: 'popupButton.html',
    styleUrls: ['popupButton.scss'],
})
export class PopupButtonComponent {

    private _closeRequested = false;

    @Input()
    public iconClass = 'fa-search';

    @Input()
    public leftButtonText: string;

    @Input()
    public rightButtonText: string;

    @Output()
    public leftButtonClick: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public rightButtonClick: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.open')
    public open = false;

    @HostListener('click')
    public onButtonClick() {
        if (!this._closeRequested) {
            this.open = true;
        }
        this._closeRequested = false;
    }

    public onRightButtonClick() {
        this._closeRequested = true;
        this.open = false;
        this.rightButtonClick.emit();
    }

    public onLeftButtonClick() {
        this._closeRequested = true;
        this.open = false;
        this.leftButtonClick.emit();
    }

}
