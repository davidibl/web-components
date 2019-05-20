import { Component, Input, ElementRef, Self, Optional, EventEmitter, Output } from "@angular/core";
import { ControlValueAccessor, ControlContainer, AbstractControl, NgControl } from "@angular/forms";

@Component({
    selector: 'xn-number-input-form',
    templateUrl: 'numberInputForm.html',
    styleUrls: ['numberInputForm.scss'],
})
export class NumberInputFormComponent extends ControlContainer implements ControlValueAccessor {

    private _value: number;
    private _internalValue: string;
    private _touched = false;
    private _blured = false;

    public control: AbstractControl;

    public hasFocus: boolean;

    public get touched(): boolean {
        return this._touched;
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

    @Input()
    public iconClass: string;

    @Input()
    public placeholder: string;

    @Input()
    public label: string;

    @Input()
    public name: string;

    @Input()
    public required: boolean;

    @Input()
    public validatable = true;

    @Input()
    public showLabel = true;

    @Input()
    public autofocus = false;

    @Output()
    public touchedChange = new EventEmitter<boolean>();

    @Input('ngModel')
    public set model(value: number) {
        this._value = value;
        if (value !== null && value !== undefined) {
            this._internalValue = '' + value;
        } else {
            this._internalValue = null;
        }
    }

    public get model(): number {
        return this._value;
    }

    public set internalModel(value: string) {
        if (this.hasValueNullAwareChanged(value)) {
            if (!value) {
                value = null
            }
            this.setTouchedIfNot();
            this._internalValue = value;
            this._value = (!value || value.trim() === '-') ? null : parseFloat(value);
            if (!this.validateOnBlur || this.validateOnChangeAndBlur) {
                this._onChange(this._value);
            }
        }
    }

    public get internalModel() {
        return this._internalValue;
    }

    @Input()
    public validateOnBlur: boolean;

    @Input()
    public validateOnChangeAndBlur: boolean;

    @Input()
    public iconAfterClass: string;

    @Input()
    public showClearButton = false;

    @Input()
    public noborder = false;

    @Input()
    public nomargin = false;

    @Output()
    public blur: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public iconClick: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public iconAfterClick: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public click = new EventEmitter<void>();

    @Output()
    public focus: EventEmitter<void> = new EventEmitter<void>();

    public constructor(private _hostElement: ElementRef,
        @Optional() @Self() public ngControl: NgControl) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public onKeyDown(event: KeyboardEvent) {
        if ([46, 8, 9, 27, 13, 110, 190, 189].indexOf(event.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+C
            (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+V
            (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
            // Allow: Ctrl+X
            (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }

    public reset(value?: any) {
        this.writeValue(null);
        this.touched = false;
    }

    public writeValue(value: any): void {
        if (!this.isValueNull(value)) {
            this._value = value;
            this._internalValue = '' + value;
        } else {
            this._value = null;
            this._internalValue = null;
        }
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

    public onFocus(): void {
        this.hasFocus = true;
        this.focus.emit();
    }

    public onBlur(): void {
        if (this.validateOnBlur || this.validateOnChangeAndBlur) {
            this._onChange(this._value);
        }
        this.hasFocus = false;
        this.setTouchedIfNot();
        this._onBlur();
        this._blured = true;
        this.blur.emit(null);
    }

    public onIconAfterClick() {
        this.iconAfterClick.emit();
    }

    public onClearClick() {
        this._value = null;
        this._onChange(this.value);
    }

    public onIconClick() {
        this.iconClick.emit();
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

    private hasValueNullAwareChanged(value: any): boolean {
        if (this.isValueNull(this._value) && this.isValueNull(value)) {
            return false;
        }

        return (value !== this._value);
    }

    private isValueNull(value: any) {
        return (value === null || value === undefined);
    }

}
