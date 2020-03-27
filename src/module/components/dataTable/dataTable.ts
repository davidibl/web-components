import { SortObjectsService } from './../../services/sortObjectsService';
import { SortOrderType } from './sortOrder';
import { SortCommand } from './sortCommand';
import { Component, Input, TemplateRef, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { HeaderColumnDirective } from './headerColumn';
import { getObjectProperty } from '../../functions/objectUtils';

@Component({
    selector: 'xn-data-table',
    templateUrl: 'dataTable.html',
    styleUrls: ['dataTable.scss'],
})
export class DataTableComponent implements AfterViewInit  {

    @ContentChildren(HeaderColumnDirective, {static: false})
    private _headerColumnElements: QueryList<HeaderColumnDirective>;
    private _headerColumns: HeaderColumnDirective[];
    private _data: Object[];

    @Input()
    public set data(data: Object[]) {
        this._data = data;
    }

    public get data() {
        return this._data;
    }

    @Input()
    public sortOrder: SortOrderType;

    @Input()
    public sortPropertyPath: string;

    @Input()
    public condensed = false;

    @Input()
    public filter: string;

    @Input()
    public pageSize = 0;

    @Input()
    public currentPage = 0;

    @Input()
    public templateRef: TemplateRef<Object>;

    public constructor(private _sortObjectService: SortObjectsService) {}

    public ngAfterViewInit(): void {
        this._headerColumns = this._headerColumnElements.toArray();
        this._headerColumns.forEach(column => {
            if (column.sortable) {
                column.columnClick.subscribe((col) => {
                    this.onHeaderColumnClick(col);
                });
            }
        });
    }

    public onCurrentPageChange(currentPage: number) {
        this.currentPage = currentPage;
    }

    private onHeaderColumnClick(sortCommand: SortCommand) {
        this.sortOrder = sortCommand.sortOrder;
        this.sortPropertyPath = sortCommand.propertyPath;
        this._headerColumns.forEach(column => column.currentOrderPropertyPath = this.sortPropertyPath);
    }
}
