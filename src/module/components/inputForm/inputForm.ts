import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    ElementRef,
    ViewChildren,
    QueryList,
    Optional,
    Self,
    ChangeDetectionStrategy,
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';

@Component({
    selector: 'xn-input-form',
    templateUrl: 'inputForm.html',
    styleUrls: ['inputForm.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent extends ControlContainer implements ControlValueAccessor {

    @ViewChildren('input')
    private _inputs: QueryList<ElementRef>;

    private _value: string;
    private _touched = false;
    private _iconClass = 'none';
    private _blured = false;

    public control: AbstractControl;

    @HostBinding('class.focused')
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
    public multiline = false;

    @Input()
    public autofocus = false;

    @Input()
    public rows = 3;

    @Output()
    public touchedChange = new EventEmitter<boolean>();

    @Input()
    public set iconClass(iconClass: string) {
        if (iconClass !== null && iconClass !== '') {
            this._iconClass = iconClass;
        }
    }

    public get iconClass() {
        return this._iconClass;
    }

    @Input()
    public alwaysShowLabel = false;

    public get blured() {
        return this._blured;
    }

    @Input('ngModel')
    public set model(value: any) {
        this._value = value;
    }

    public get model(): any {
        return this._value;
    }

    @Input()
    public readonly = null;

    @Input()
    public showPointer = false;

    public set internalModel(value: any) {
        if (this.hasValueNullAwareChanged(value)) {
            if (value === '') { value = null; }
            this.setTouchedIfNot();
            this._value = value;
            if (!this.validateOnBlur || this.validateOnChangeAndBlur) {
                this._onChange(this._value);
            }
        }
    }

    public get internalModel() {
        return this._value;
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
    public outerErrors: Object;

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

    public isModelSet(): boolean {
        return (this.model !== null && this.model !== undefined && this.model !== '');
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

    public setFocus() {
        setTimeout(() => {
            this._inputs.first.nativeElement.focus();
       }, 100);
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
        return (!value || value === '');
    }

}
