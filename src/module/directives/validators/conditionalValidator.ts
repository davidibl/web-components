import { isNull } from '../../functions/checks';
import { SimpleChanges } from '@angular/core';

export abstract class ConditionalValidator {

    private _onChange: () => void;

    checkValidationRequired(validateIfCondition: boolean) {
        const validateIf = (isNull(validateIfCondition)) ? true : validateIfCondition;
        if (!validateIf) {
            return false;
        }
        return true;
    }

    public registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('validateIf' in changes) {
            if (this._onChange) this._onChange();
        }
    }
}
