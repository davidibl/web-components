import { FilterObjectService } from './../services/filterObjectsService';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterObjects',
})
export class FilterObjectsPipe implements PipeTransform {

    public constructor(private _filterService: FilterObjectService) { }

    public transform<T>(value: T[], filter: string, propertyPath: string) {
        return this._filterService.filter(value, filter, propertyPath);
    }

}
