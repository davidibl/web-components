import { Component, Input, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'content-tile',
    templateUrl: 'contentTile.html',
})
export class ContentTileComponent {

    @HostBinding('class.single') protected singleTile = false;
    @HostBinding('class.double') protected doubleTile = false;

    @HostBinding('class.none') protected hideOnMobile = false;
    @HostBinding('class.block-l') protected showOnDesktop = false;

    @Input()
    public set placeholder(value: boolean) {
        this.hideOnMobile = true;
        this.showOnDesktop = true;
    }

    @Input()
    public set size(size: number) {
        switch (size) {
            case 1:
                this.singleTile = true;
                break;
            case 2:
                this.doubleTile = true;
                break;
            default:
                this.singleTile = true;
        }
    }

}
