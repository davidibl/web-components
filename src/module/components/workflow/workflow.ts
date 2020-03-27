import { Component, ContentChild, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractWorkflowComponent } from './abstractWorkflow';
import { WorkflowState, WorkflowStateTypes } from './workflowState';


@Component({
    selector: 'xn-workflow',
    templateUrl: 'workflow.html',
    styleUrls: ['workflow.scss'],
})
export class WorkflowComponent implements AfterContentInit {

    @ContentChild(AbstractWorkflowComponent)
    private _workflowComponent: AbstractWorkflowComponent;

    private _currentStep = 1;

    @Input()
    public nextLabel = 'Weiter';

    @Input()
    public previousLabel = 'Zurück';

    @Input()
    public finishLabel = 'Abschließen';

    @Output()
    public workflowStateChange = new EventEmitter<WorkflowState>();

    public stepCount: number;

    public set currentStep(step: number) {
        this._currentStep = step;
        this._workflowComponent.openStep(step);
        this.workflowStateChange.emit(new WorkflowState(WorkflowStateTypes.RUNNING, step));
    }

    public get currentStep() {
        return this._currentStep;
    }

    public get currentStepValid() {
        return this.getWorkflowAttributeOr(workflow => workflow.currentStepValid, false);
    }

    public get prepreventStepWhenInvalid() {
        return this.getWorkflowAttributeOr(workflow => workflow.preventStepWhenInvalid, false);
    }

    public ngAfterContentInit() {
        this.stepCount = this._workflowComponent.stepCount;
        this._workflowComponent
            .elementsCountChange
            .subscribe(_ => this.stepCount = this._workflowComponent.stepCount);

        this._workflowComponent
            .stepChange
            .subscribe(step => {
                this._currentStep = step;
                this.workflowStateChange.emit(new WorkflowState(WorkflowStateTypes.RUNNING, step));
            });
    }

    public finish() {
        this.workflowStateChange.emit(new WorkflowState(WorkflowStateTypes.FINISHED, this.currentStep));
    }

    private getWorkflowAttributeOr<T>(supplier: (workflow: AbstractWorkflowComponent) => T, alternate: T) {
        if (!this._workflowComponent) {
            return alternate;
        }
        return supplier(this._workflowComponent);
    }
}
