import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { isNull } from '../functions/checks';

@Directive({
    selector: '[xnIfNull]'
})
export class IfNullDirective {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    @Input()
    public set xnIfNull(nullableObject: any) {
        if (isNull(nullableObject)) {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            }
            return;
        }
        this.viewContainer.clear();
        this.hasView = false;
    }
}
