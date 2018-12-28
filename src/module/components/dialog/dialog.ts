import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'xn-dialog',
    templateUrl: 'dialog.html',
})
export class DialogComponent {

    @Input()
    @HostBinding('class.open')
    public open = true;

    @Input()
    public closeOnOutsideClick = true;

    @Input()
    public showDefaultButtons = true;

    @Input()
    public hideButtonBar = false;

    @Input()
    public defaultOkButtonText = 'Ok';

    @Input()
    public hideCancelButton = false;

    @Input()
    public hideOkButton = false;

    @Input()
    public closable = true;

    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onOutsideClick() {
        if (this.closeOnOutsideClick) {
            this.onDialogClose();
        }
    }

    public onDialogClose() {
        this.open = false;
        this.openChange.emit(this.open);
    }

    public onConfirmClick() {
        this.onDialogClose();
        this.confirm.emit(true);
    }

    public onCancelClick() {
        this.onDialogClose();
        this.confirm.emit(false);
    }

}
