import { Component,
         Input,
         Output,
         EventEmitter,
         HostBinding,
         ElementRef,
         OnChanges,
         SimpleChanges,
         Optional,
         Self} from '@angular/core';
import { ControlContainer, ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';
import { IKeyValuePair } from '../../model/keyValuePairInterface';
import { getObjectProperty } from '../../functions/objectUtils';
import { equal } from '../../functions/checks';

@Component({
    selector: 'xn-dropdown',
    templateUrl: 'dropdown.html',
    styleUrls: ['dropdown.scss'],
})
export class DropdownComponent extends ControlContainer implements ControlValueAccessor, OnChanges {

    private static CHEVRON_DOWN_CLASS = 'fa-chevron-down';

    private _value: string;
    private _touched = false;
    public _iconClass = 'none';
    public _items: Object[];

    public control: AbstractControl;
    public _valueDisplay: string;

    @HostBinding('class.focused')
    public hasFocus: boolean;

    @Input()
    @HostBinding('class.open')
    public dropdownOpen = false;

    public get touched(): boolean {
        return this._touched;
    }

    @Input()
    public placeholder: string;

    @Input()
    public idPropertyPath = 'key';

    @Input()
    public displayPropertyPath = 'value';

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
    public noborder = false;

    @Input()
    public nomargin = false;

    @Input()
    public canDeselect = true;

    @Input()
    @HostBinding('class.small')
    public small = false;

    @Input()
    @HostBinding('class.transparent')
    public transparent = false;

    @Input()
    public set iconClass(iconClass: string) {
        if (iconClass !== null && iconClass !== '') {
            this._iconClass = iconClass;
        }
    }

    @Input()
    public set items(items: Object[]) {
        this._items = items;
    }

    public set modelDisplay(value: string) {
        if (value === null || value === '') {
            this.model = null;
        }
    }

    @Input('ngModel')
    public set model(value: any) {
        if (value !== this._value) {
            this.trySetSelectedItem(value);
        }
    }

    public get model(): any {
        return this._value;
    }

    @Input()
    public validateOnBlur: boolean;

    @Input()
    public validateOnChangeAndBlur: boolean;

    @Output()
    public blur: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public selectionChange = new EventEmitter<void>();

    public chevronClass = DropdownComponent.CHEVRON_DOWN_CLASS;

    public constructor(private _hostElement: ElementRef,
                       @Optional() @Self() public ngControl: NgControl) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public reset(value?: any) {
        this.writeValue(value);
        this._touched = false;
    }

    public writeValue(value: any): void {
        this._value = value;
        // this.trySetSelectedItem(this._value);
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
        this.setTouchedIfNot();
        this._onBlur();
        this.blur.emit(null);
    }

    public onToggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    public onCloseDropdown() {
        this.dropdownOpen = false;
    }

    public onOpenDropdown() {
        this.dropdownOpen = true;
    }

    public onItemSelect(item: IKeyValuePair<any, any>): void {
        this.setTouchedIfNot();
        this.trySetSelectedItem(getObjectProperty(this.idPropertyPath, item));

        this.selectionChange.emit();
        this.onCloseDropdown();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['items'] || changes['model']) {
            this.trySetSelectedItem(this._value);
        }
    }

    private _onChange = (_: any) => void 0;
    private _onTouched = () => void 0;
    private _onBlur = () => void 0;

    private trySetSelectedItem(value: any) {
        const lastValue = this._value;
        if (!this._items) {
            this._valueDisplay = null;
            return;
        }

        const selectedItem = this._items.find(item =>
            JSON.stringify(getObjectProperty(this.idPropertyPath, item)) === JSON.stringify(value));

        if ((!value || !selectedItem) && !this._value) {
            this._valueDisplay = null;
            return;
        }

        if (selectedItem) {
            this._value = value;
            if (this._items) {
                this._valueDisplay = getObjectProperty(this.displayPropertyPath, selectedItem);
            }
        } else {
            this._value = value;
            this._valueDisplay = null;
        }
        if (!this.validateOnBlur || this.validateOnChangeAndBlur) {
            if (!equal(lastValue, value)) {
                this._onChange(this._value);
            }
        }
    }

    private setTouchedIfNot(): void {
        if (!this.ngControl.touched) {
            this._touched = true;
            this.ngControl.control.markAsTouched();
            this._onTouched();
        }
    }

}
