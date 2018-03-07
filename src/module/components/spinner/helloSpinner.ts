import { Component, Input } from '@angular/core';

@Component({
    selector: 'xn-hello-spinner',
    templateUrl: 'helloSpinner.html',
})
export class HelloSpinnerComponent {

    @Input()
    public message: string;

}
