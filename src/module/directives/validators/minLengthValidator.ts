import { Directive, forwardRef, Inject, Host, Optional, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MinLengthValidatorDirective),
        },
    ],
    selector: '[xnMinLength]',
})
export class MinLengthValidatorDirective implements Validator {

    @Input()
    public xnMinLength: number;

    @Input()
    public minLengthMessage: string;

    constructor() {
    }

    public validate(control: FormControl): {} {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return this.getValidationError();
        }

        if (value.length < this.xnMinLength) {
            return this.getValidationError();
        }

        return null;
    }

    private getValidationError() {
        const message = (this.minLengthMessage) ? this.minLengthMessage : 'validation.message.minLength';
        return {
            minLength: {
                message: message,
                tokens: {minLength: this.xnMinLength},
                order: 1
            }
        };
    }
}
