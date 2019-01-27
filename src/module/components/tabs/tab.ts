import { Input, HostBinding, Component } from '@angular/core';

@Component({
    selector: 'xn-tab',
    templateUrl: 'tab.html',
    styleUrls: ['tab.scss'],
})
export class TabComponent {

    private _active = false;
    private _title: string;
    private _iconClass: string;
    private _id: string;

    @HostBinding('class.active')
    public set active(active: boolean) {
        this._active = active;
    }

    public get active() {
        return this._active;
    }

    @Input()
    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    @Input()
    public get id() {
        return (this._id) ? this._id : this._title;
    }

    public set id(id: string) {
        this._id = id;
    }

    @Input()
    public get iconClass() {
        return this._iconClass;
    }

    public set iconClass(iconClass: string) {
        this._iconClass = iconClass;
    }
}
