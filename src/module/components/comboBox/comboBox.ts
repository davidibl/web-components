import { Component, Input, HostBinding, Optional, Self, OnChanges, SimpleChanges, TemplateRef, HostListener } from '@angular/core';
import { SortOrderType } from '../dataTable/sortOrder';
import { ControlContainer, ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { getObjectProperty } from '../../functions/objectUtils';
import { FilterObjectService } from '../../services/filterObjectsService';

@Component({
    selector: 'xn-combo-box',
    templateUrl: 'comboBox.html',
    styleUrls: ['comboBox.scss'],
})
export class ComboBoxComponent extends ControlContainer implements ControlValueAccessor, OnChanges {

    private static CHEVRON_DOWN_CLASS = 'fa-chevron-down';

    private _touched = false;
    private _initialItems: Object[];
    private _items: Object[];
    private _selectedItem: Object;
    private _displayText: string;
    private _dropdownOpen = false;

    public chevronClass = ComboBoxComponent.CHEVRON_DOWN_CLASS;

    public control: AbstractControl;

    public selectedIndex = -1;

    public get touched() {
        return this.ngControl.touched;
    }

    @Input()
    public iconClass = 'none';

    @Input()
    public placeholder: string;

    @Input()
    public idPropertyPath: string;

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
    public inputMode: false;

    @Input()
    public template: TemplateRef<void>;

    @Input()
    public set items(items: Object[]) {
        this._initialItems = items.slice();
        this._items = this._filterService.filter(this._initialItems, this.displayText);
    }

    @Input()
    public noborder = false;

    @Input()
    public nomargin = false;

    @Input()
    @HostBinding('class.small')
    public small = false;

    @Input()
    @HostBinding('class.transparent')
    public transparent = false;

    public get items() {
        return this._items;
    }

    public set displayText(displayText: string) {
        if (this.displayText !== displayText) {
            this._displayText = displayText;
            if (this.inputMode) {
                this._displayText = displayText;
                this._selectedItem = this._displayText;
                this.setTouchedIfNot();
                this._onChange(this._selectedItem);
                return;
            }
            this._selectedItem = null;
            this._onChange(this._selectedItem);
        }

        this._items = this._filterService.filter(this._initialItems, this.displayText);
    }

    public get displayText() {
        return this._displayText;
    }

    @Input()
    public sortOrder: SortOrderType;

    @Input()
    public sortPropertyPath: string;

    @HostBinding('class.focused')
    public hasFocus: boolean;

    @Input()
    @HostBinding('class.open')
    public set dropdownOpen(open: boolean) {
        if (open && this._dropdownOpen !== open) {
            this.selectedIndex = -1;
        }
        this._dropdownOpen = open;
    }

    public get dropdownOpen() {
        return this._dropdownOpen;
    }

    @Input('ngModel')
    public set model(value: any) {
        if (value !== this._selectedItem) {
            this._selectedItem = value;
            if (!this.inputMode && !value) {
                this._displayText = null;
            }
        }
    }

    public get model(): any {
        return this._selectedItem;
    }

    public constructor(@Optional() @Self() public ngControl: NgControl,
                       private _filterService: FilterObjectService) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['items'] || changes['model']) {
            this.trySetSelectedItem(changes.model.currentValue);
            this._items = this._filterService.filter(this._initialItems, this.displayText);
        }
    }

    public reset(value?: any) {
        this.writeValue(value);
        this._touched = false;
    }

    public writeValue(value: any): void {
        this._selectedItem = value;
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

    public onToggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    public onCloseDropdown() {
        this.dropdownOpen = false;
    }

    public onOpenDropdown() {
        this.dropdownOpen = true;
    }

    public onArrowUp(event: KeyboardEvent) {
        if (!this.dropdownOpen) {
            this.dropdownOpen = true;
        }
        if (this.selectedIndex <= -1) {
            this.selectedIndex = this._items.length;
        }
        --this.selectedIndex;
    }

    public onArrowDown(event: KeyboardEvent) {
        if (!this.dropdownOpen) {
            this.dropdownOpen = true;
        }
        if (this.selectedIndex >= this._items.length) {
            this.selectedIndex = -2;
        }
        ++this.selectedIndex;
    }

    public onEnter(event: KeyboardEvent) {
        this.onItemSelect(this._items[this.selectedIndex]);
        event.cancelBubble = true;
    }

    public onEscape(event: KeyboardEvent) {
        if (this.dropdownOpen) {
            this.dropdownOpen = false;
        }
    }

    public onItemSelect(item: Object): void {
        this.setTouchedIfNot();
        this.setValueAndEmit(item);
        this._displayText = getObjectProperty(this.displayPropertyPath, item);
        this.onCloseDropdown();
    }

    private _onChange = (_: any) => void 0;
    private _onTouched = () => void 0;
    private _onBlur = () => void 0;

    private trySetSelectedItem(item: any) {
        if (this.inputMode) {
            this._displayText = item;
            return;
        }

        let selectedItem: any;
        if (this.idPropertyPath) {
            selectedItem = this._items.find(value => getObjectProperty(this.idPropertyPath, value) === item);
        } else {
            selectedItem = item;
        }
        if (selectedItem) {
            this._displayText = getObjectProperty(this.displayPropertyPath, selectedItem);
        }
    }

    private setValueAndEmit(value: Object) {
        if (this.idPropertyPath) {
            this._selectedItem = getObjectProperty(this.idPropertyPath, value);
        } else {
            this._selectedItem = value;
        }
        this._onChange(this._selectedItem);
    }

    private setTouchedIfNot(): void {
        if (!this.ngControl.touched) {
            this._touched = true;
            this.ngControl.control.markAsTouched();
            this._onTouched();
        }
    }
}
