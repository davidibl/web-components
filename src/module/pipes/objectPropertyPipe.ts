import { Pipe, PipeTransform } from '@angular/core';
import { getObjectProperty } from '../functions/objectUtils';

@Pipe({
    name: 'objectProperty'
})
export class ObjectPropertyPipe implements PipeTransform {

    transform(value, propertyPath: string): any {
        if (!value) {
            return null;
        }

        return getObjectProperty(propertyPath, value);
    }
}
