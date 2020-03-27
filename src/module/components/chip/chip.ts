import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'chip',
    templateUrl: 'chip.html',
    styleUrls: ['chip.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {

    @Input()
    public text: string;

    public getFirstChar(): string {
        return (this.text) ? this.text.substr(0, 1) : '';
    }

}
