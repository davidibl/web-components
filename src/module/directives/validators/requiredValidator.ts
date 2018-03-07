import { Directive, forwardRef, Inject, Host, Optional, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MyRequiredValidatorDirective),
        },
    ],
    selector: '[xnRequired]',
})
export class MyRequiredValidatorDirective implements Validator {

    @Input()
    public requiredMessage: string;

    constructor() {
    }

    public validate(control: FormControl): {} {
        const value = control.value;

        return (value) ? null : this.getValidationError();
    }

    private getValidationError() {
        const message = (this.requiredMessage) ? this.requiredMessage : 'validation.message.required';
        return {
            required: {
                message: message,
                order: 0
            }
        };
    }
}
