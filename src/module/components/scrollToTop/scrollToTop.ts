import { Component, HostBinding } from '@angular/core';
import { ScrollSpyService } from '../../services/scrollSpyService';
import { ScrollService } from '../../services/scrollService';

@Component({
    moduleId: module.id,
    selector: 'scroll-to-top',
    templateUrl: 'scrollToTop.html',
})
export class ScrollToTopComponent {

    @HostBinding('class.none')
    public isHidden = true;

    @HostBinding('class.fade-in')
    public fadeIn = true;

    @HostBinding('class.fadeOut')
    public fadeOut = false;

    constructor(private _scrollSpyService: ScrollSpyService,
                private _scrollService: ScrollService) {

        _scrollService.onScroll().subscribe(scrollPos => {
            if (scrollPos > 500) {
                this.isHidden = false;
                return;
            }
            this.isHidden = true;
        });
    }

    public scrollToTop(): void {
        this._scrollService.scrollToTop();
    }

}
