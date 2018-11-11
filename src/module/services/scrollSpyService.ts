import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ScrollSpyService {

    private scrollSpies: { [id: string]: ReplaySubject<number> } = {};

    public addScrollSpy(id: string, scrollStream: ReplaySubject<number>): void {
        const currentScrollSpy = this.getScrollSpy(id);
        scrollStream.subscribe((scrollPos) => currentScrollSpy.next(scrollPos));
    }

    public getScrollStream(id: string): ReplaySubject<number> {
        return this.getScrollSpy(id);
    }

    private getScrollSpy(id: string) {
        if (this.scrollSpies[id] === undefined) {
            this.scrollSpies[id] = new ReplaySubject<number>(1);
        }
        return this.scrollSpies[id];
    }
}
