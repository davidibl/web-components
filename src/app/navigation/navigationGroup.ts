import { Component, Input } from "@angular/core";

export interface NavigationListItem {
    name: string;
    link: string;
}

export interface NavigationGroup {
    title: string;
    items: NavigationListItem[];
}

@Component({
    selector: 'xn-navigation-group',
    templateUrl: 'navigationGroup.html',
})
export class NavigationGroupComponent {

    @Input()
    public navigationGroup: NavigationGroup;
}
