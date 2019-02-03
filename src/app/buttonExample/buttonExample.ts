import { Component } from '@angular/core';

@Component({
    selector: 'xn-button-example',
    templateUrl: 'buttonExample.html',
    styleUrls: ['buttonExample.scss'],
})
export class ButtonExampleComponent {

    public toggled = true;

    public notToggled = false;

    public toggleButtonValue: boolean;

    public togglerZweiValue: any;
}
