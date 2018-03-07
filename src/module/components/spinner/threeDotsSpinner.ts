import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'xn-three-dots-spinner',
    templateUrl: 'threeDotsSpinner.html',
})
export class ThreeDotsSpinnerComponent {

    @HostBinding('class.dark')
    @Input()
    public dark = false;

    @Input()
    public message: string;

}
