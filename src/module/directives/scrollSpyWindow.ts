import { Directive, OnInit, HostListener } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ScrollSpyService } from '../services/scrollSpyService';
import { ScrollService } from '../services/scrollService';

@Directive({
    selector: '[scrollSpyWindow]',
})
export class ScrollSpyDirective implements OnInit {

    private _scrollStream: ReplaySubject<number> = new ReplaySubject<number>(1);

    constructor(private _scrollSpyService: ScrollSpyService,
                private _scrollService: ScrollService) { }

    public ngOnInit() {
        this._scrollSpyService.addScrollSpy('window', this._scrollStream);
    }

    @HostListener('window:scroll')
    public onScroll() {
        const scrollPosition = this._scrollService.getScrollTop();
        this._scrollStream.next(scrollPosition);
    }
}
