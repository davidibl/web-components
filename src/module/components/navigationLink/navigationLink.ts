import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from '../../model/navigationItem';

@Component({
    selector: 'xn-navigation-link',
    templateUrl: 'navigationLink.html',
})
export class NavigationLinkComponent {

    @Input()
    public navigationItem: NavigationItem;

    @Output()
    public linkClick: EventEmitter<string> = new EventEmitter<string>();

    public onLinkClick() {
        this.linkClick.emit(this.navigationItem.name);
    }

}
