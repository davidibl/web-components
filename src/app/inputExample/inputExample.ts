import { Component } from '@angular/core';

@Component({
    selector: 'xn-input-example',
    templateUrl: 'inputExample.html',
})
export class InputExampleComponent {

    public input: string;
    public inputValue = 'Hallo Welt';
    public inputRequired: string;
    public mailinput: string;
}
