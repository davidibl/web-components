import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'xn-infobox',
    templateUrl: 'infobox.html',
    styleUrls: ['infobox.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoboxComponent {

    private _isInfo = true;
    private _isError = false;

    @Input()
    @HostBinding('class.info')
    public set info(isInfo: boolean) {
        if (isInfo) {
            this._isError = false;
        }
        this._isInfo = isInfo;
    }

    public get info() {
        return this._isInfo;
    }

    @Input()
    @HostBinding('class.error')
    public set error(isError: boolean) {
        if (isError) {
            this._isInfo = false;
        }
        this._isError = isError;
    }

    public get error() {
        return this._isError;
    }

}
