import { SortObjectsService } from './../services/sortObjectsService';
import { SortOrderType } from './../components/dataTable/sortOrder';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
})
export class SortPipe implements PipeTransform {

    public constructor(private _sortObjectService: SortObjectsService) {}

    public transform(value: any[], sortOrder?: SortOrderType, propertyPath?: string) {
        const result = this._sortObjectService.sortItems(value, sortOrder, propertyPath);
        if (!result) {
            return null;
        }
        return this._sortObjectService.sortItems(value, sortOrder, propertyPath).slice();
    }

}
