import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'joinObjects',
})
export class JoinObjectPipe implements PipeTransform {

    public transform(a: Object, b: Object): Object {
        return Object.assign({}, a, b);
    }
}
