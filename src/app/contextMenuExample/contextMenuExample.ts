import { Component } from "@angular/core";
import { ContextMenuCommand } from '../../module/model/contextMenuCommand';

@Component({
    selector: 'xn-context-menu-example',
    templateUrl: 'contextMenuExample.html',
})
export class ContextMenuExampleComponent {

    public onContextMenuItemClick(command: ContextMenuCommand) {
        if (command.command === 'alert') {
            alert(command.getContext());
        }
    }
}
