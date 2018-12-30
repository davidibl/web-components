import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { isNull } from '../functions/checks';

@Directive({
    selector: '[xnIfFalse]'
})
export class IfFalseDirective {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    @Input()
    public set xnIfFalse(condition: boolean) {
        if (isNull(condition) || !!condition) {
            this.viewContainer.clear();
            this.hasView = false;
            return;
        }
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
    }
}
