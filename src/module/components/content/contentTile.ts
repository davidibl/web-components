import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'xn-content-tile',
    templateUrl: 'contentTile.html',
    styleUrls: ['contentTile.scss'],
})
export class ContentTileComponent {

    private _singleClassList = '.col-12 .col-6-m .col-4-l';
    private _doubleClassList = '.col-12 .col-12-m .col-8-l';

    private _doubleSize = false;

    @HostBinding('class')
    protected classList = this._singleClassList;

    @HostBinding('class.single') protected singleTile = false;
    @HostBinding('class.double') protected doubleTile = false;

    @HostBinding('class.none') protected hideOnMobile = false;
    @HostBinding('class.block-l') protected showOnDesktop = false;

    public set doubleSize(doubleSize: boolean) {
        this.doubleSize = doubleSize;
        this.classList = (doubleSize) ? this._doubleClassList : this._singleClassList;
    }

    public get doubleSize() {
        return this._doubleSize;
    }

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
