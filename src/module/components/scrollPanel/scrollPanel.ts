import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'xn-scroll-panel',
    templateUrl: 'scrollPanel.html',
    styleUrls: ['scrollPanel.scss'],
})
export class ScrollPanelComponent {

    @HostBinding('style.max-height.px')
    @Input()
    public maxHeight = null;

    @HostBinding('style.min-height.px')
    @Input()
    public minHeight = null;
}
