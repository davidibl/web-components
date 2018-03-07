import { Component, HostBinding, OnChanges, Input, Optional, Self, HostListener, EventEmitter, Output } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';

@Component({
    selector: 'xn-toggle-button',
    templateUrl: 'toggleButton.html',
    styleUrls: ['toggleButton.scss'],
})
export class ToggleButtonComponent extends ControlContainer implements ControlValueAccessor {

    private _touched = false;
    private _value = false;

    public control: AbstractControl;

    @Input()
    public showAlternateLabel = false;

    @HostBinding('class.toggled')
    public get toggleState() {
        return this._value;
    }

    @HostBinding('class.button')
    public isButton = true;

    @Input()
    @HostBinding('class.disabled')
    public isDisabled = false;

    @Input('ngModel')
    public set model(value: any) {
        if (value !== this.value) {
            this._value = value;
        }
    }

    public get model(): any {
        return this._value;
    }

    @Output()
    public touchedChange = new EventEmitter<boolean>();

    public get touched(): boolean {
        return this._touched;
    }

    public constructor(@Optional() @Self() public ngControl: NgControl) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    @HostListener('click')
    public onClick() {
        if (this.isDisabled) {
            return;
        }
        this._value = !this._value;
        this.setTouchedIfNot();
        this._onChange(this._value);
    }

    public writeValue(value: any): void {
        this._value = value;
    }

    public registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }
    public registerOnBlur(fn: () => void): void {
        this._onBlur = fn;
    }

    private _onChange = (_: any) => void 0;
    private _onTouched = () => void 0;
    private _onBlur = () => void 0;

    private setTouchedIfNot(): void {
        if (!this.ngControl.touched) {
            this._touched = true;
            this.ngControl.control.markAsTouched();
            this._onTouched();
            this.touchedChange.emit(this._touched);
        }
    }
}
