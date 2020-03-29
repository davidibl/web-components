import { Component } from '@angular/core';

@Component({
    selector: 'xn-dropdown-example',
    templateUrl: 'dropdownExample.html',
})
export class DropdownExampleComponent {

    public items = [
        { key: 1, value: 'A' },
        { key: 2, value: 'B' },
        { key: 3, value: 'C' },
        { key: 4, value: 'D' },
    ];

    public selected: number = 1;
}
