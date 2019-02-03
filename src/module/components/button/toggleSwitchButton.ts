import { Component, Input, ElementRef, Self, Optional, Output, EventEmitter } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, NgControl } from '@angular/forms';

export interface ToggleItem {
    text: string;
    value: any;
}

@Component({
    selector: 'xn-toggle-switch-button',
    templateUrl: 'toggleSwitchButton.html',
    styleUrls: ['toggleSwitchButton.scss'],
})
export class ToggleSwitchButtonComponent extends ControlContainer implements ControlValueAccessor {

    private _touched = false;
    private _value: any;

    public control: AbstractControl;

    @Input()
    public toggleItems: ToggleItem[];

    @Input()
    public validateOnBlur: boolean;

    @Input()
    public validatable = true;

    @Input()
    public outerErrors: Object;

    @Input()
    public validateOnChangeAndBlur: boolean;

    @Output()
    public touchedChange = new EventEmitter<boolean>();

    @Input('ngModel')
    public set model(value: number) {
        this._value = value;
    }

    public get model(): number {
        return this._value;
    }

    public onItemClick(value: any) {
        this.setTouchedIfNot();
        this._value = (this._value === value) ? null : value;
        this._onChange(this._value);
    }

    @Input()
    public set touched(touched: boolean) {
        this._touched = touched;
        if (touched) {
            this.ngControl.control.markAsTouched();
        } else {
            this.ngControl.control.markAsUntouched();
        }
    }

    public constructor(private _hostElement: ElementRef,
        @Optional() @Self() public ngControl: NgControl) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public reset(value?: any) {
        this.writeValue(null);
        this.touched = false;
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
