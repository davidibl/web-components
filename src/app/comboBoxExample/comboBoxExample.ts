import { Component } from '@angular/core';
import { FilterObjectService } from '../../module/services/filterObjectsService';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'xn-combo-box-example',
    templateUrl: 'comboBoxExample.html',
    styleUrls: ['comboBoxExample.scss'],
})
export class ComboBoxExampleComponent {

    public currentSelected: any;
    public items = [
        {
            name: 'David',
            alter: 35,
            eltern: [{name: 'helmut'}, {name: 'michaela'}],
        },
        {
            name: 'Steffi',
            alter: 33,
            eltern: [{name: 'Rudi'}, {name: 'Luise'}],
        },
        {
            name: 'Martin',
            alter: 34,
            eltern: [{name: 'helmut'}, {name: 'michaela'}],
        }
    ];
    public currentSelected2 = this.items[1];
    public currentSelected3 = this.items[2].alter;

    public variousItems = [];
    public currentSelectedInput = 'David';

    public constructor(private _filterService: FilterObjectService) {}

    public textChanged(text: string) {
        of(this._filterService.filter(this.items, text))
            .pipe(
                debounceTime(1000)
            )
            .subscribe(result => {
                this.variousItems = result;
            });
        this.currentSelectedInput = text;
    }
}
