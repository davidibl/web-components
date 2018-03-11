import { Directive, forwardRef, Input, HostListener, Optional, Host, ViewContainerRef, Self, SkipSelf } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS, ControlContainer, NgForm } from '@angular/forms';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EmailValidatorDirective),
        },
    ],
    selector: '[xnEmailValidator]',
})
export class EmailValidatorDirective implements Validator {

    /* tslint:disable */
    private emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* tslint:enable */

    @Input()
    public emailMessage: string;

    constructor() {}

    public validate(control: FormControl): {} {
        if (!control || !control.value) {
            return null;
        }

        return this.emailRegex.test(control.value) ? null : this.getValidationMessage();
    }

    private getValidationMessage() {
        const message = (this.emailMessage) ? this.emailMessage : 'validation.message.email';
        return {
            email: {
                message: message,
                order: 1,
                visibleAfterBlur: true,
            }
        };
    }
}
