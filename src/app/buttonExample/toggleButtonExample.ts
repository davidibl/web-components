import { Component } from '@angular/core';

@Component({
    selector: 'xn-toggle-button-example',
    templateUrl: 'toggleButtonExample.html',
})
export class ToggleButtonExampleComponent {

    public toggled = true;

    public notToggled = false;

    public toggleButtonValue: boolean;

    public togglerZweiValue: any;
}
