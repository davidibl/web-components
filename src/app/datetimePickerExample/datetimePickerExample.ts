import { Component } from '@angular/core';

@Component({
    selector: 'xn-datetime-picker-example',
    templateUrl: 'datetimePickerExample.html',
})
export class DatetimePickerExampleComponent {

    public currentDate = new Date();

    public unsetDate: Date;

}
