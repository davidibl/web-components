import { EventEmitter, Input, Output } from '@angular/core';

export abstract class AbstractWorkflowComponent {
    public stepCount: number;
    public stepChange = new EventEmitter<number>();

    @Input()
    public preventStepWhenInvalid = false;

    @Input()
    public linearStepping = false;

    @Output()
    public elementsCountChange = new EventEmitter<void>();

    abstract get currentStepValid(): boolean;

    abstract openStep(step: number);
}
