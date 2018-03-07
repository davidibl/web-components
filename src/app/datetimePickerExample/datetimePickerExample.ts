import { Component } from '@angular/core';

@Component({
    selector: 'xn-datetime-picker-example',
    templateUrl: 'datetimePickerExample.html',
    styleUrls: ['datetimePickerExample.scss'],
})
export class DatetimePickerExampleComponent {

    public currentDate = new Date();

    public unsetDate: Date;

}
