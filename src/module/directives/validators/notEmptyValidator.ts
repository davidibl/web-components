import { Directive, forwardRef, Input, OnChanges } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { ConditionalValidator } from './conditionalValidator';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NotEmptyValidatorDirective),
        },
    ],
    selector: '[xnNotEmpty]',
})
export class NotEmptyValidatorDirective extends ConditionalValidator implements Validator, OnChanges {

    @Input()
    public notEmptyMessage: string;

    @Input()
    public validateIf: boolean;

    constructor() { super(); }

    public validate(control: FormControl): {} {
        if (!this.checkValidationRequired(this.validateIf)) { return null; }

        const value = control.value;
        if (value === null || value === undefined) {
            return this.getValidationError();
        }

        if ((<Array<any>>value).length < 1) {
            return this.getValidationError();
        }

        return null;
    }

    private getValidationError() {
        const message = (this.notEmptyMessage) ? this.notEmptyMessage : 'validation.message.notEmpty';
        return {
            minLength: {
                message: message,
                order: 1,
            }
        };
    }
}
