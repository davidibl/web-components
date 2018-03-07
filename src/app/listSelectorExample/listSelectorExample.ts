import { Component } from '@angular/core';

declare interface ITestItem {
    name: string;
    key: number;
}

@Component({
    selector: 'xn-list-selector-example',
    templateUrl: 'listSelectorExample.html',
    styleUrls: ['listSelectorExample.scss'],
})
export class ListSelectorExampleComponent {

    public items = [
        {
            name: 'was',
            key: 1,
            email: 'test@test.de',
        },
        {
            name: 'geht hier',
            key: 2,
            email: 'hello@xnoname.de',
        },
        {
            name: 'denn',
            key: 3,
            email: 'bla@lv1871.de',
        },
        {
            name: 'krasses ab',
            key: 4,
            email: 'hu@amazon.de',
        },
        {
            name: 'alter',
            key: 5,
            email: 'test@alter.de',
        }
    ];

    public selectedItems = [
        this.items[0],
        this.items[3]
    ];

    public selectedItemsSingle = [
        this.items[1]
    ];

}
