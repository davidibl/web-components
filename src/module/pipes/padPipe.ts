import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pad',
    pure: false,
})
export class PadPipe implements PipeTransform {

    private static LEFT = 'left';
    private static RIGHT = 'right';

    public transform(value: string, type: string, format: string): string {
        switch (type) {
            case PadPipe.LEFT:
                return this.padLeft(value, format);
            case PadPipe.RIGHT:
                return this.padRight(value, format);
            default:
                return value;
        }
    }

    private padLeft(value: string, format: string): string {
        const stringValue = '' + value;
        return format.substr(stringValue.length).concat(stringValue);
    }

    private padRight(value: string, format: string): string {
        const stringValue = '' + value;
        return stringValue.concat(format.substr(format.length - stringValue.length));
    }
}
