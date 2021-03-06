import { Component } from "@angular/core";
import { NAVIGATION_DEFINITION } from '../navigationDefinition';

@Component({
    selector: 'xn-navigation',
    templateUrl: 'navigation.html',
})
export class NavigationComponent {

    public navigationGroups = Object.keys(NAVIGATION_DEFINITION);
    public navigationDefinition = NAVIGATION_DEFINITION;

}
