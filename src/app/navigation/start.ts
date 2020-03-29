import { Component } from '@angular/core';
import { NAVIGATION_DEFINITION } from '../navigationDefinition';

@Component({
    selector: 'xn-start',
    templateUrl: 'start.html',
    styleUrls: ['start.scss'],
})
export class StartComponent {

    public navigationGroups = Object.keys(NAVIGATION_DEFINITION);
    public navigationDefinition = NAVIGATION_DEFINITION;
}
