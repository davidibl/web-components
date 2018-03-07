import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'switchString',
})
export class SwitchStringPipe implements PipeTransform {

    public transform(value: string, alternative: string, decider: boolean) {
        return (decider) ? value : alternative;
    }
}
