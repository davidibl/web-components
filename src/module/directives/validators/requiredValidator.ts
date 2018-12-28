import { Directive, forwardRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { isNull } from '../../functions/checks';
import { ConditionalValidator } from './conditionalValidator';

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
export class MyRequiredValidatorDirective extends ConditionalValidator implements Validator, OnChanges {

    @Input()
    public requiredMessage: string;

    @Input()
    public validateIf: boolean;

    constructor() { super(); }

    public validate(control: FormControl): {} {
        if (!this.checkValidationRequired(this.validateIf)) { return null; }

        const value = control.value;

        return (!isNull(value)) ? null : this.getValidationError();
    }

    private getValidationError() {
        const message = (this.requiredMessage) ? this.requiredMessage : 'validation.message.required';
        return {
            required: {
                message: message,
                order: 0,
            }
        };
    }
}
