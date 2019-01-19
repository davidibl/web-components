import { Component, AfterContentInit, QueryList, ContentChildren, Input, forwardRef, EventEmitter } from '@angular/core';
import { AccordionElementComponent } from './accordionElement';
import { AbstractWorkflowComponent } from '../workflow/abstractWorkflow';

@Component({
    selector: 'xn-accordion',
    templateUrl: 'accordion.html',
    styleUrls: ['accordion.scss'],
    providers: [{
        provide: AbstractWorkflowComponent, useExisting: forwardRef(() => AccordionComponent),
    }],
})
export class AccordionComponent extends AbstractWorkflowComponent implements AfterContentInit {

    @ContentChildren(AccordionElementComponent)
    private _elements: QueryList<AccordionElementComponent>;

    public elementsArray: AccordionElementComponent[];

    public get stepCount() {
        if (!this.elementsArray) {
            return 0;
        }
        return this.elementsArray.length;
    }

    public get currentStepValid() {
        if (!this._elements) { return true; }
        const currentStep = this.elementsArray.find(element => element.open);
        if (!currentStep) { return true; }
        return !currentStep.invalid;
    }

    public ngAfterContentInit() {
        if (!this._elements) {
            return;
        }

        this._elements.changes.subscribe(_ => {
            this.initializeElements();
        });
        this.initializeElements();
    }

    private initializeElements() {
        if (!this._elements) { return; }

        this.elementsArray = this._elements.toArray();

        const currentStep = this.elementsArray.find(element => element.open);

        this.elementsArray.forEach((element, index) => {
            element.stepNumber = (index + 1);
            element.activate.subscribe(openedElement => this.openElement(openedElement));
        });
        if (currentStep) { return; }
        this.openElement(this.elementsArray[0]);
    }

    public openStep(step: number) {
        this.openElement(this._elements.find(element => element.stepNumber === step));
    }

    private openElement(openElement: AccordionElementComponent) {
        if (this.preventStepWhenInvalid && !this.allValid(openElement)) {
            return;
        }

        if (!openElement) {
            return;
        }

        if (this.linearStepping && !this.isLinearStep(openElement)) {
            return;
        }

        this.elementsArray.forEach(element => {
            element.open = false;
            element.currentStepNumber = openElement.stepNumber;
        });
        openElement.open = true;
        this.stepChange.emit(openElement.stepNumber);
    }

    private isLinearStep(openElement: AccordionElementComponent) {
        const currentStep = this.elementsArray.find(element => element.open);
        if (!currentStep) {
            return true;
        }
        const currentStepNumber = currentStep.stepNumber;
        return  (openElement.stepNumber < currentStepNumber ||
            openElement.stepNumber === (currentStepNumber + 1));
    }

    private allValid(openElement: AccordionElementComponent) {
        return this.elementsArray
            .filter(element => element.stepNumber < openElement.stepNumber && element.invalid)
            .length < 1;
    }
}
