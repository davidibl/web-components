import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'xn-material-spinner',
    templateUrl: 'materialSpinner.html',
    styleUrls: ['materialSpinner.scss'],
})
export class MaterialSpinnerComponent {

    @Input()
    @HostBinding('class.small')
    public small = false;
}
