import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'xn-block-ui',
    templateUrl: 'blockUi.html',
    styleUrls: ['blockUi.scss']
})
export class BlockUiComponent {

    @HostBinding('class.bright')
    @Input()
    public bright = false;

    @HostBinding('class.element-level')
    @Input()
    public elementLevel = false;

    @HostBinding('class.show')
    @Input()
    public show = false;

    @HostBinding('class.center-content')
    @Input()
    public centerContent = false;

}
