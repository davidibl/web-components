import { SortOrder, SortOrderType } from './../components/dataTable/sortOrder';
import { Injectable } from '@angular/core';
import { getObjectProperty } from '../functions/objectUtils';

@Injectable()
export class SortObjectsService {

    public sortItems<T>(items: T[], sortOrder?: SortOrderType, propertyPath?: string): T[] {
        if (!sortOrder) {
            return items;
        }

        return items.sort((element1, element2) => this.compare(element1, element2, sortOrder, propertyPath));
    }

    private compare<T>(element1: T, element2: T, sortOrder?: SortOrderType, propertyPath?: string) {

        const value1 = (!propertyPath) ? element1 : getObjectProperty(propertyPath, element1);
        const value2 = (!propertyPath) ? element1 : getObjectProperty(propertyPath, element2);


        if (value1 > value2) {
            return this.sortHigher(sortOrder);
        }
        if (value1 < value2) {
            return this.sortLower(sortOrder);
        }
        return 0;
    }

    public sortHigher(sortOrder: SortOrderType) {
        return (sortOrder === SortOrder.DESCENDING) ? -1 : 1;
    }

    public sortLower(sortOrder: SortOrderType) {
        return (sortOrder === SortOrder.DESCENDING) ? 1 : -1;
    }
}
