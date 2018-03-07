import { Component, Input, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'flyin-mobile-menu',
    templateUrl: 'flyinMobileMenu.html',
})
export class FlyinMobileMenuComponent {

    public _isMenuOpen = false;

    @Input()
    @HostBinding('class.inverted')
    public inverted = false;

    @Input()
    public zindex = 1000;

    @Input()
    public bottom = '50px';

    @Input()
    public menuItemText: string;

    public onToggleMenu(): void {
        this._isMenuOpen = !this._isMenuOpen;
    }

    public onItemClicked(): void {
        this.closeMenu();
    }

    public onCloseMenu(): void {
        this.closeMenu();
    }

    private closeMenu(): void {
        this._isMenuOpen = false;
    }

}
