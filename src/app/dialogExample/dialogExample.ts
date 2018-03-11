import { Component } from '@angular/core';

@Component({
    selector: 'xn-dialog-example',
    templateUrl: 'dialogExample.html',
})
export class DialogExampleComponent {

    public simpleDialogOpen = false;

    public showDialog() {
        this.simpleDialogOpen = true;
    }
}
