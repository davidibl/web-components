import { Directive, Input, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';
import { SortCommand } from './sortCommand';
import { SortOrder, SortOrderType } from './sortOrder';

@Directive({
    selector: '[xnHeaderColumn]',
})
export class HeaderColumnDirective {

    private _propertyPath: string;
    private _sortOrder: SortOrderType;

    @HostBinding('class.sorted-descending')
    public sortedDescending = false;

    @HostBinding('class.sorted-ascending')
    public sortedAscending = false;

    @HostBinding('class.sortable')
    public sortable = false;

    @Input()
    public set propertyPath(value: string) {
        this._propertyPath = value;
        if (value) {
            this.sortable = true;
        }
    }

    public get propertyPath() {
        return this._propertyPath;
    }

    @Output()
    public columnClick = new EventEmitter<SortCommand>();

    @HostListener('click')
    public onHostClicked($event) {
        this.sortOrder = this.sortOrder;
        this.columnClick.emit(new SortCommand(this._sortOrder, this._propertyPath));
    }

    public set currentOrderPropertyPath(path: string) {
        if (this._propertyPath !== path) {
            this.setUnordered();
        }
    }

    public setUnordered() {
        this.sortedAscending = false;
        this.sortedDescending = false;
        this._sortOrder = null;
    }

    private get sortOrder() {
        return (!this._sortOrder) ? SortOrder.DESCENDING :
            (this._sortOrder === SortOrder.DESCENDING) ? SortOrder.ASCENDING : SortOrder.DESCENDING;
    }

    private set sortOrder(value: SortOrderType) {
        this._sortOrder = value;
        this.sortedAscending = (value === SortOrder.ASCENDING);
        this.sortedDescending = (value === SortOrder.DESCENDING);
    }
}
