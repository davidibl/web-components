import { Component } from '@angular/core';

@Component({
    selector: 'xn-pagnation-example',
    templateUrl: 'paginationExample.html',
})
export class PaginationExampleComponent {

    public totalCount = 150;
    public pageSize = 20;
    public currentPage = 1;
    public currentPage2;

    public totalCount2 = 10;
}
