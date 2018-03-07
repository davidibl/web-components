import { Directive, forwardRef, Inject, Host, Optional, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

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
export class NotEmptyValidatorDirective implements Validator {

    @Input()
    public notEmptyMessage: string;

    constructor() {
    }

    public validate(control: FormControl): {} {
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
                order: 1
            }
        };
    }
}
