import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'xn-context-menu-item',
    templateUrl: 'contextMenuItem.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuItemComponent {

    @Input()
    public command: string;

    @Output()
    public itemClick = new EventEmitter<string>();

    public onClick() {
        this.itemClick.emit(this.command);
    }
}
