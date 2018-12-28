import { Directive, forwardRef, Input, OnChanges } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ConditionalValidator } from './conditionalValidator';

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
export class MinLengthValidatorDirective extends ConditionalValidator implements Validator, OnChanges {

    @Input()
    public xnMinLength: number;

    @Input()
    public minLengthMessage: string;

    @Input()
    public validateIf: boolean;

    constructor() { super(); }

    public validate(control: FormControl): {} {
        if (!this.checkValidationRequired(this.validateIf)) { return null; }

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
                order: 1,
                visibleAfterBlur: true,
            }
        };
    }
}
