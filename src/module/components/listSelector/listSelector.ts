import { Component, Input, OnChanges, SimpleChanges, Optional, Self, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { getObjectProperty } from '../../functions/objectUtils';
import { SelectionMode } from './selectionMode';
import { equal } from '../../functions/checks';

@Component({
    selector: 'xn-list-selector',
    templateUrl: 'listSelector.html',
    styleUrls: ['listSelector.scss'],
})
export class ListSelectorComponent extends ControlContainer implements ControlValueAccessor, OnChanges {

    private _touched = false;
    private _selectedItems = new Array<any>();

    public control: AbstractControl;

    @Input()
    public template: TemplateRef<void>;

    @Input()
    public items: Object[];

    @Input()
    public selectionMode = SelectionMode.MULTI;

    @Input()
    public displayPropertyPath: string;

    @Input()
    public idPropertyPath: string;

    @Input()
    public validatable = true;

    @Input('ngModel')
    public set model(value: any[]) {
        if (value && value !== this.value) {
            this._selectedItems = value.slice();
        } else if (!value && value !== this.value) {
            this._selectedItems = null;
        }
    }

    public get model(): any[] {
        return this._selectedItems;
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

    public onCheckedChange(selected: boolean, item: Object) {
        if (selected) {
            if (this.selectionMode === SelectionMode.SINGLE) {
                this._selectedItems = new Array();
            }
            if (!this.containsItem(item)) {
                this.addItem(getObjectProperty(this.idPropertyPath, item));
            }
        } else {
            const id = getObjectProperty(this.idPropertyPath, item);
            const itemToRemove = this._selectedItems.find(selectedItem => selectedItem === id);
            this._selectedItems.splice(this._selectedItems.indexOf(itemToRemove), 1);
        }
        this._onChange(this._selectedItems);
        this.setTouchedIfNot();
    }

    public getSelection(item: Object) {
        if (!this._selectedItems) {
            return false;
        }
        return this.containsItem(item);
    }

    public hasError(): boolean {
        return (!!this.ngControl.errors && this._touched);
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    public writeValue(value: any): void {
        this._selectedItems = value;
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

    private addItem(item: any) {
        if (!this._selectedItems) {
            this._selectedItems = new Array();
        }
        this._selectedItems.push(item);
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

    private containsItem(item: any) {
        return !!this._selectedItems &&
               !!this._selectedItems.find(selectedItem => equal(selectedItem, getObjectProperty(this.idPropertyPath, item)));
    }
}
