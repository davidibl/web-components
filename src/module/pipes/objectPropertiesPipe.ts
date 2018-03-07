import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'properties'
})
export class ObjectPropertiesPipe implements PipeTransform {

    transform(value, args: string[]): any {
        if (!value) {
            return [];
        }

        return Object.getOwnPropertyNames(value)
            .reduce((result: any[], key: string) => {
                result.push({ key: key, value: value[key] });
                return result;
            }, []);
    }
}
