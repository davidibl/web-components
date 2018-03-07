import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { MomentService } from '../../services/momentService';

@Directive({
    providers: [
        {
            multi: true,
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateFormatValidatorDirective),
        },
    ],
    selector: '[xnDateFormatValidator]',
})
export class DateFormatValidatorDirective implements Validator {

    @Input()
    public dateFormatMessage: string;
    constructor(
        private _momentService: MomentService) {
    }

    public validate(control: FormControl): {} {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }
        if (!this._momentService.isValidDateString(value)) {
            return this.getValidationError();
        }
        return null;
    }

    private getValidationError() {
        const message = (this.dateFormatMessage) ? this.dateFormatMessage : 'validation.message.dateformat';
        return {
            dateFormat: {
                message: message,
                tokens: {datePattern: this._momentService.getCurrentLocalePattern()},
                order: 1,
            }
        };
    }
}
