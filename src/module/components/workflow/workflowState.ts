export type WorkflowStateType = 'RUNNING' | 'FINISHED';

export const WorkflowStateTypes = {
    RUNNING: 'RUNNING' as WorkflowStateType,
    FINISHED: 'FINISHED' as WorkflowStateType
};

export class WorkflowState {

    public constructor(public state: WorkflowStateType,
                       public currentStep: number) {}
}
