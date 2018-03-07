import { EventEmitter, Input } from '@angular/core';

export abstract class AbstractWorkflowComponent {
    public stepCount: number;
    public stepChange = new EventEmitter<number>();

    @Input()
    public preventStepWhenInvalid = false;

    @Input()
    public linearStepping = false;

    abstract get currentStepValid(): boolean;

    abstract openStep(step: number);
}
