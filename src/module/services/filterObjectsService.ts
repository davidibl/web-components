import { Injectable } from '@angular/core';
import { getObjectProperty } from '../functions/objectUtils';
import { MomentService } from './momentService';

@Injectable()
export class FilterObjectService {

    public constructor(private _momentService: MomentService) { }

    public filter<T>(items: T[], filter: string, propertyPath?: string): T[] {
        if (!filter || filter === '') {
            return items;
        }
        return items.filter(item => this.filterItem(item, filter, propertyPath)).slice();
    }

    private filterItem<T>(item: T, filter: string, propertyPath?: string): boolean {
        return this.filterCompleteObject(item, filter, propertyPath);
    }

    private filterCompleteObject<T>(item: T, filter: string, propertyPath: string): boolean {
        return this.find(getObjectProperty(propertyPath, item), filter);
    }

    private containsCaseInsensitive(value: string, filter: string): boolean {
        return value.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    }

    private find<T>(item: T, filter: any) {
        if (typeof item === 'number') {
            return this.containsCaseInsensitive(item.toString(), filter);
        }

        if (this._momentService.isValidDate(<any>item)) {
            return this.containsCaseInsensitive(this._momentService.formatDateDefault(<any>item), filter);
        }

        if (typeof item === 'string') {
            return this.containsCaseInsensitive(item, filter);
        }

        return Object.keys(item).map(key => this.find(item[key], filter)).filter(result => result).length > 0;
    }
}
