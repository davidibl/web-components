import { Component } from '@angular/core';
import { WorkflowState, WorkflowStateTypes } from '../../module/components/workflow/workflowState';

@Component({
    selector: 'xn-workflow-example',
    templateUrl: 'workflowExample.html',
    styleUrls: ['workflowExample.scss'],
})
export class WorkflowExampleComponent {

    public bla: string;
    public finished = false;
    public onWorkflowState(state: WorkflowState) {
        this.finished = (state.state === WorkflowStateTypes.FINISHED);
    }
}
