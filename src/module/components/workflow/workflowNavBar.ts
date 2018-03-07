import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'xn-workflow-nav-bar',
    templateUrl: 'workflowNavBar.html',
    styleUrls: ['workflowNavBar.scss'],
})
export class WorkflowNavBarComponent {

    @Input()
    public totalSteps: number;

    @Input()
    public currentStep: number;

    @Input()
    public currentStepValid = false;

    @Input()
    public preventStepWhenInvalid = false;

    @Input()
    public nextLabel = 'Weiter';

    @Input()
    public previousLabel = 'Zurück';

    @Input()
    public finishLabel = 'Abschließen';

    @Output()
    public currentStepChange = new EventEmitter<number>();

    @Output()
    public finish = new EventEmitter<void>();

    public get nextPossible() {
        return (this.currentStep <= this.totalSteps) &&
            (!this.preventStepWhenInvalid || this.preventStepWhenInvalid && this.currentStepValid);
    }

    public get previousPossible() {
        return this.currentStep > 1;
    }

    public next() {
        if (this.currentStep === this.totalSteps) {
            this.finish.emit();
            return;
        }
        ++this.currentStep;
        this.currentStepChange.emit(this.currentStep);
    }

    public previous() {
        --this.currentStep;
        this.currentStepChange.emit(this.currentStep);
    }
}
