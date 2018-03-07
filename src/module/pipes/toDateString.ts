import { Pipe, PipeTransform } from '@angular/core';
import { MomentService } from '../services/momentService';

@Pipe({
    name: 'toDateString',
})
export class ToDateStringPipe implements PipeTransform {

    constructor(private _momentService: MomentService) {
    }

    public transform(value: Date): string {
        return this._momentService.formatDateDefault(value);
    }
}
