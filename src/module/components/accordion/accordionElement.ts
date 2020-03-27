import {
    Component,
    Output,
    EventEmitter,
    Input,
    HostBinding,
    ContentChild,
    AfterContentInit,
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import { NgForm } from '@angular/forms';
import { isNull } from '../../functions/checks';

@Component({
    animations: [
        trigger('rotated', [
            state('true' , style({ transform: 'rotate(0)' })),
            state('false', style({ transform: 'rotate(180deg)' })),
            transition('* => *', animate('150ms')),
        ])
    ],
    selector: 'xn-accordion-element',
    templateUrl: 'accordionElement.html',
    styleUrls: ['accordionElement.scss'],
})
export class AccordionElementComponent implements AfterContentInit {

    @ContentChild(NgForm)
    private _form: NgForm;
    private _open = false;
    private _stepNumber: number;
    private _invalid = false;
    private _additionalValidationParameter: boolean;

    @Input()
    public grow = false;

    @HostBinding('class.flex-grow')
    public isGrown = false;

    @Input()
    @HostBinding('class.open')
    public set open(open: boolean) {
        this._open = open;
        if (this._open && this.grow) {
            this.isGrown = true;
        } else {
            this.isGrown = false;
        }
    }

    public get open() {
        return this._open;
    }

    public set currentStepNumber(stepNumber: number) {
        if (this._stepNumber <= stepNumber) {
            this.passed = true;
        } else {
            this.passed = false;
        }
    }

    @HostBinding('class.passed')
    public passed = false;

    public set stepNumber(stepNumber: number) {
        this._stepNumber = stepNumber;
    }

    public get stepNumber() {
        return this._stepNumber;
    }

    @HostBinding('class.invalid')
    public get invalid() {
        return this._invalid;
    }

    @Input()
    public set additionalValidationParameter(valid: boolean) {
        this._additionalValidationParameter = valid;
        this._invalid = this.currentlyInvalid;
    }

    @Input()
    public title: string;

    @Output()
    public activate = new EventEmitter<AccordionElementComponent>();

    public ngAfterContentInit() {
        if (this._form) {
            this._form.statusChanges.subscribe(status => {
                this._invalid = this.currentlyInvalid;
                // this._invalid = !this._form.valid;
            });
        }
    }

    public openStep() {
        this.activate.emit(this);
    }

    private get currentlyInvalid() {
        let valid = true;
        if (this._form) {
            valid = this._form.valid;
        }
        if (!isNull(this._additionalValidationParameter)) {
            valid = (valid && this._additionalValidationParameter);
        }
        return !valid;
    }
}
