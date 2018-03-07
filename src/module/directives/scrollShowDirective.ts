import { Directive, Input, OnInit, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { ScrollService } from '../services/scrollService';
@Directive({
    selector: '[show-scroll]',
})
export class ShowScrollDirective implements OnInit {

    private _showPosition: number;

    @HostBinding('class.none')
    public elementHidden = true;

    @HostBinding('class.fade-in')
    public fadeIn = true;

    @HostBinding('class.animation')
    public animation = true;

    @Input('show-scroll')
    public set showPosition(showPosition: number) {
        this._showPosition = showPosition;
    }

    public constructor(private _scrollService: ScrollService,
                       private _elementRef: ElementRef,
                       private _renderer: Renderer2) {
    }

    public ngOnInit() {
        this.elementHidden = !(this._scrollService.getScrollTop() > this.showPosition);

        this._scrollService
            .onScroll()
            .subscribe(position => {
                if (position > this._showPosition) {
                    this.showElement();
                } else {
                    this.hideElement();
                }
            });
    }

    private showElement() {
        this.elementHidden = false;
    }

    private hideElement() {
        this.elementHidden = true;
    }

}
