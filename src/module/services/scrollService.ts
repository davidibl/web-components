import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ScrollService {

    private scrollLog = new ReplaySubject<number>(1);
    private scrollingElement: Element;

    constructor( @Inject(DOCUMENT) private document: Document) {
        this.scrollingElement = this.document.scrollingElement ||
            this.document.documentElement;

        document.onscroll = () => {
            this.scrollLog.next(this.scrollingElement.scrollTop);
        };
    }

    public scrollToTop(): void {
        this.scrollingElement.scrollTop = 0;
    }

    public getScrollTop(): number {
        return this.scrollingElement.scrollTop;
    }

    public onScroll(): ReplaySubject<number> {
        return this.scrollLog;
    }
}
