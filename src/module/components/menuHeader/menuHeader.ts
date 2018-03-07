import {Component, Input} from '@angular/core';

@Component({
    selector: 'xn-menu-header',
    templateUrl: 'menuHeader.html',
})
export class MenuHeaderComponent {

    @Input()
    public brandLogoSource: string;

    @Input()
    public brandName: string;

    @Input()
    public open = false;

}
