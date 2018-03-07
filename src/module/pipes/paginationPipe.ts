import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pageIt',
})
export class PaginationPipe implements PipeTransform {

    public transform(value: Array<Object>, pagesize: number, currentPage: number) {
        if (!value) {
            return new Array();
        }
        if (!pagesize || pagesize === 0) {
            return value;
        }

        const startIndex = (!currentPage) ? 0 : currentPage * pagesize;
        const endIndex = startIndex + pagesize;
        return value.slice(startIndex, endIndex);
    }
}
