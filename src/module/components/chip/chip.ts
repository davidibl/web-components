import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'chip',
    templateUrl: 'chip.html',
})
export class ChipComponent {

    @Input()
    public text: string;

    public getFirstChar(): string {
        return (this.text) ? this.text.substr(0, 1) : '';
    }

}
