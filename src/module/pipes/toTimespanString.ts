import { Pipe, PipeTransform } from '@angular/core';
import { MomentService } from '../services/momentService';
import { Observable } from 'rxjs/Observable';

@Pipe({
    name: 'toTimespanString',
})
export class ToTimespanStringPipe implements PipeTransform {

    constructor(private _momentService: MomentService) {
    }

    public transform(value: string): string {
        return this._momentService.formatTimespan(value);
    }
}
