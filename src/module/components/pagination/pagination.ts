import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { isNull } from '../../functions/checks';

@Component({
    selector: 'xn-pagination',
    templateUrl: 'pagination.html',
    styleUrls: ['pagination.scss'],
})
export class PaginationComponent implements OnChanges {

    private _currentPage = 0;

    public pageCountNumber: number;
    public currentItemStart: number;
    public currentItemEnd: number;

    @HostBinding('class.centered')
    @Input()
    public alignCenter = false;

    @HostBinding('class.left')
    @Input()
    public alignLeft = false;

    @Input()
    public centeredCounter = false;

    @Input()
    public set currentPage(currentPage: number) {
        if (!isNull(currentPage)) {
            this._currentPage = currentPage;
        }
    }

    public get currentPage() {
        return this._currentPage;
    }

    @Input()
    public itemCount: number;

    @Input()
    public pageSize: number;

    @Output()
    public currentPageChange: EventEmitter<number> = new EventEmitter<number>();

    public ngOnChanges(changes: SimpleChanges): void {
        if (!isNull(this.itemCount) && !isNull(this.pageSize)) {
            this.pageCountNumber = Math.ceil(this.itemCount / this.pageSize);
        }

        if (!isNull(this.currentPage) && !isNull(this.pageSize)) {
            this.calculateNewPage(this.currentPage);
        }
    }

    public nextPage(): void {
        if (this.currentPage === (this.pageCountNumber)) {
            return;
        }

        const nextPage = this.currentPage + 1;
        this.changePage(nextPage);
    }

    public previousPage(): void {
        if (this.currentPage === 0) {
            return;
        }

        const previousPage = this.currentPage - 1;
        this.changePage(previousPage);
    }

    public firstPage() {
        if (this.currentPage === 0) {
            return;
        }

        this.changePage(0);
    }

    public lastPage() {
        if (this.currentPage === (this.pageCountNumber)) {
            return;
        }

        this.changePage(this.pageCountNumber - 1);
    }

    private changePage(page: number) {
        this.calculateNewPage(page);
        this.currentPageChange.emit(this.currentPage);
    }

    private calculateNewPage(page: number) {
        this.currentPage = page;
        this.currentItemStart = (this.currentPage * this.pageSize) + 1;
        const currentItemEnd = (this.currentPage + 1) * this.pageSize;
        this.currentItemEnd =  (currentItemEnd > this.itemCount) ? this.itemCount : currentItemEnd;
    }
}
