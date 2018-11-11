import { Component, Input, HostBinding } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

@Component({
    animations: [
        trigger('expanded', [
            state('false', style({ height: 0 })),
            state('true' , style({ height: '*' })),
            transition('* => *', animate('150ms')),
        ])
    ],
    selector: 'xn-collapsable-panel',
    templateUrl: 'collapsablePanel.html',
    styleUrls: ['collapsablePanel.scss'],
})
export class CollapsablePanelComponent {

    @HostBinding('@expanded')
    @HostBinding('class.expanded')
    public isExpanded = false;

    @Input()
    public set expanded(value: boolean) {
        this.isExpanded = value;
    }

}
