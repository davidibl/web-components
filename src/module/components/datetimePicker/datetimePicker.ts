import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    ElementRef,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import {
    ControlContainer,
    ControlValueAccessor,
    AbstractControl,
    NgControl
} from '@angular/forms';
import { MomentService } from '../../services/momentService';
import { TranslationService } from '../../services/translationService';
import { InputFormComponent } from './../inputForm/inputForm';
import { isNull } from '../../functions/checks';

@Component({
    selector: 'xn-datetime-picker',
    templateUrl: 'datetimePicker.html',
})
export class DatetimePickerComponent extends ControlContainer implements ControlValueAccessor {

    @ViewChild(InputFormComponent)
    private _inputForm: InputFormComponent;

    private _dateValue: Date;

    public _value: string;

    public control: AbstractControl;

    @HostBinding('class.focused')
    public hasFocus: boolean;

    @Input()
    public placeholder: string;

    public calendarOpen = false;

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

    @Input('ngModel')
    public set model(dateValue: Date) {
        if (isNull(dateValue)) {
            this._dateValue = dateValue;
            return;
        }
        if (dateValue !== this._dateValue) {
            this._dateValue = dateValue;
            if (this._momentService.isValidDate(dateValue)) {
                this._value = this.formatDate(dateValue);
            }
        }
    }

    public get model(): Date {
        return this._dateValue;
    }

    public set newDate(dateValue: Date) {
        this._dateValue = dateValue;
        this._value = this.formatDate(dateValue);
        if (!this.validateOnBlur || this.validateOnChangeAndBlur) {
            this._onChange(this._dateValue);
        }
    }

    @Input()
    public validateOnBlur: boolean;

    @Input()
    public validateOnChangeAndBlur: boolean;

    public currentDateFormatValidationMessage: string;

    @Output()
    public blur: EventEmitter<void> = new EventEmitter<void>();

    public constructor(private _hostElement: ElementRef,
                       private _momentService: MomentService,
                       @Optional() @Self() public ngControl: NgControl,
                       private _translationService: TranslationService) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        this._translationService
            .translateDefault('VALIDATION.DATE.FORMAT')
            .subscribe(translation => {
                this.currentDateFormatValidationMessage = translation
                    + this._momentService.getCurrentLocalePattern();
            });
    }

    public isModelSet(): boolean {
        return (this.model !== null && this.model !== undefined);
    }

    public reset() {
        this._inputForm.reset();
    }

    public writeValue(value: any): void {
        if (value !== this._dateValue) {
            this._dateValue = value;
            if (this._momentService.isValidDate(value)) {
                this._value = this.formatDate(value);
            } else {
                this._value = null;
            }
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
    }

    public onBlur(): void {
        if (this.validateOnBlur || this.validateOnChangeAndBlur) {
            this._onChange(this._value);
        }
        this.hasFocus = false;
        this._onBlur();
        this.blur.emit(null);
    }

    public onValueChange(value: string) {
        if (this._momentService.isValidDateString(value)) {
            this.model = this._momentService.parseDateDefaultFormat(value);
        } else {
            this.model = (!value) ? <any>value : null;
        }
        if (!this.validateOnBlur || this.validateOnChangeAndBlur) {
            this._onChange(this._dateValue);
        }
    }

    public onTouchedChange(touched: boolean) {
        this._onTouched();
    }

    public onCalendarDateChange(value: Date) {
        this.calendarOpen = false;
        this.newDate = value;
    }

    public onIconClick() {
        this.calendarOpen = !this.calendarOpen;
    }

    public onCloseCalendar() {
        if (!this.calendarOpen) {
            return;
        }
        this.calendarOpen = false;
    }

    private _onChange = (_: any) => void 0;
    private _onTouched = () => void 0;
    private _onBlur = () => void 0;

    private formatDate(dateValue: Date): string {
        return this._momentService.formatDateDefault(dateValue);
    }

}
