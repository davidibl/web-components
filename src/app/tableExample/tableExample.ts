import { Component } from '@angular/core';

@Component({
    selector: 'xn-table-example',
    templateUrl: 'tableExample.html',
})
export class TableExampleComponent {

    public filter: string;
    public currentPage = 0;
    public items = [
        {
            name: 'DAvid',
            alter: 21,
            geburtstag: new Date(),
        },
        {
            name: 'Steffi',
            alter: 17,
            geburtstag: '2015-05-14T19:07:12.06Z',
        },
        {
            name: 'Jemand',
            alter: 29,
            geburtstag: '2015-04-11T19:07:12.06Z',
        }
    ];

    public onCurrentPageChange(currentPage: number) {
        this.currentPage = currentPage;
    }
}
