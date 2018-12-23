import { Component } from "@angular/core";

@Component({
    selector: 'xn-number-input-example',
    templateUrl: 'numberInputExample.html',
})
export class NumberInputExampleComponent {

    private _number = 11;

    public get number() {
        return this._number;
    }

    public set number(value: number) {
        this._number = value;
        console.log(this._number);
    }
}
